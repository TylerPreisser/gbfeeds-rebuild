#!/usr/bin/env bash
# THE CI GATE WITHOUT GITHUB ACTIONS  (canonical copy: _workspace/tools/ci-local/run.sh; installed into each
# repo as scripts/ci-local.sh by _workspace/tools/ci-local/install.sh -- edit the canonical copy, re-install).
#
# Runs THIS REPO'S CI steps -- declared once in scripts/ci-steps.sh, the same commands as its workflow --
# from a CLEAN worktree of one commit, on the Node major the workflow pins, stopping at the first failing
# step as a workflow does. Nothing is loosened: a green here is the same commands a green tick meant.
#
# With --status the result is posted as a GitHub COMMIT STATUS (context "ci-local"), which the PR page and
# `gh pr checks` show like a workflow's check. Statuses are free and do not depend on Actions billing. The
# pre-push hook (.githooks/pre-push) calls this in the background on every push; never run it in the
# foreground during a session -- push, then `gh pr checks --watch`.
#
# Usage: scripts/ci-local.sh [--status] <sha or ref>        Logs: ~/.cache/ci-local/<repo>/<sha>.log
#
# scripts/ci-steps.sh contract (sourced inside the clean worktree, $WT):
#   CI_NODE=22                      # the workflow's node major (setup-node); 20/22/...; default 22
#   ci_steps() { run <name> <dir> <command...>; ... }     # in order; the first failure ends the gate
#   ci_summary() { ...; }           # optional: one short line for the status (e.g. the test count), from $LOG
#   Helpers available: $WT (worktree root), $LOG, $CI_PYTHON3 (/usr/bin/python3, the machine's 3.9), run()
set -u
STATUS=0
if [ "${1:-}" = "--status" ]; then STATUS=1; shift; fi
SHA_ARG="${1:?usage: scripts/ci-local.sh [--status] <sha or ref>}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
SHA="$(git -C "$REPO" rev-parse "${SHA_ARG}^{commit}" 2>/dev/null)" || { echo "FATAL: no commit $SHA_ARG" >&2; exit 2; }
SLUG="$(git -C "$REPO" remote get-url origin | sed -E 's#.*github.com[:/]##; s#\.git$##')"
LOGDIR="${CI_LOCAL_LOGS:-$HOME/.cache/ci-local/$(basename "$SLUG")}"
mkdir -p "$LOGDIR"
LOG="$LOGDIR/$SHA.log"
: > "$LOG"
export LOG
export CI_PYTHON3="/usr/bin/python3"

post() {  # state description
  [ "$STATUS" -eq 1 ] || return 0
  gh api -X POST "repos/$SLUG/statuses/$SHA" -f state="$1" -f context="ci-local" \
    -f description="$(printf '%s' "$2" | cut -c1-140)" -f target_url="https://github.com/$SLUG/commit/$SHA" >/dev/null 2>&1 \
    || echo "(could not post the '$1' status: is $SHA on GitHub yet, and is gh signed in?)" | tee -a "$LOG"
}

SCRATCH="$(mktemp -d)"
WT="$SCRATCH/ci"
export WT
git -C "$REPO" worktree add --detach "$WT" "$SHA" >/dev/null 2>&1 || { post error "could not check out $SHA"; echo "FATAL: worktree add failed" >&2; exit 2; }
cleanup() { git -C "$REPO" worktree remove --force "$WT" >/dev/null 2>&1 || true; rm -rf "$SCRATCH"; }
trap cleanup EXIT

STEPS="$WT/scripts/ci-steps.sh"
[ -f "$STEPS" ] || { post error "no scripts/ci-steps.sh at $SHA"; echo "FATAL: $SHA has no scripts/ci-steps.sh (see _workspace/tools/ci-local/README.md)" >&2; exit 2; }
CI_NODE=22
# shellcheck disable=SC1090
source "$STEPS"
declare -f ci_steps >/dev/null || { post error "ci-steps.sh defines no ci_steps()"; echo "FATAL: scripts/ci-steps.sh must define ci_steps()" >&2; exit 2; }

# The workflow's Node major, from Homebrew's versioned keg, or whatever node on PATH already matches.
NODE_BIN="$(brew --prefix "node@$CI_NODE" 2>/dev/null)/bin"
if [ -x "$NODE_BIN/node" ]; then export PATH="$NODE_BIN:$PATH"; fi
case "$(node --version 2>/dev/null)" in
  "v$CI_NODE".*) ;;
  *) post error "node $CI_NODE not installed on the gate machine"; echo "FATAL: this repo's CI runs Node $CI_NODE; found '$(node --version 2>/dev/null)'. brew install node@$CI_NODE" >&2; exit 2 ;;
esac
post pending "$(basename "$SLUG") CI steps from a clean worktree on $(node --version)"

echo "== ci-local  $SLUG  $SHA  node $(node --version)  npm $(npm --version)  log $LOG" | tee -a "$LOG"
run() {  # name dir command...
  local name="$1" dir="$2"; shift 2
  echo "--- $name  ($dir)  $*" >> "$LOG"
  ( cd "$WT/$dir" && "$@" ) >> "$LOG" 2>&1
  local rc=$?
  echo "step $name exit=$rc" | tee -a "$LOG"
  return $rc
}
export -f run
( set -e; ci_steps )
fail=$?
SUMMARY=""
if declare -f ci_summary >/dev/null; then SUMMARY="$(ci_summary 2>/dev/null | head -1)"; fi
if [ $fail -eq 0 ]; then
  echo "== ci-local GREEN  $SHA  ${SUMMARY:+($SUMMARY)}" | tee -a "$LOG"
  post success "${SUMMARY:-all steps green}; node $(node --version)"
  exit 0
fi
echo "== ci-local RED  $SHA  (see $LOG)" | tee -a "$LOG"
tail -40 "$LOG"
post failure "a step failed; log on the pushing machine: $LOG"
exit 1
