# <repo name> — working rules for Claude Code

This file is an error ledger, not a manual: every rule below exists because its absence cost
something once. Keep it short; grow the Gotchas list when something goes wrong, delete rules
that stop earning their place. Deterministic gates live in `.claude/hooks/` (they block; this
file only advises).

## Build / test / deploy (fill in)
- Build: `<command>`
- Test: `<command>` (one-shot, never watch mode)
- Deploy target(s): `<what / where / who may trigger it>` — production deploys happen only on
  the owner's explicit say-so (`ALLOW_DEPLOY=1` prefix acknowledges that; the hook blocks otherwise).
- Trunk / default branch: `<name>` — feature branches off it, PRs back into it, never commit to it directly.

## Workflow
- Red test first: write the failing test, watch it fail, fix, watch it pass. A test that passes
  on its first run proves nothing.
- Verify in the layer the code runs in, then prove it live before saying "done" — a merge or a
  green CI is not evidence that anything is running.
- Before opening a PR run `/adversary-review` (fresh-context reviewer; verdicts AGREE /
  DISAGREE_EVIDENCE / DISAGREE_CONCERN — only cited-code evidence blocks).
- `/commit-push-pr <ticket> <summary>` commits ONLY this session's files, pushes, opens the PR.
  Conventional commits, no `Co-Authored-By` trailer. Never merge; the owner does.

## Settled decisions — see DECISIONS/

`DECISIONS/` is the source of truth for settled intent; review agents read it before reviewing.
- **Conformance to an Accepted ADR is NEVER a defect.** Do not "fix", re-add, or recommend re-adding what an ADR removed.
- **If you believe a settled decision is wrong, DO NOT change code or file a bug** — put a note under "Decision Concerns" in your review output citing the ADR number. Nothing more.
- **Accepted ADRs are immutable — supersede, never edit.** New decision = next number; the old file gets one line: `Status: Superseded by ADR-000N`.

## Repo etiquette
- Match surrounding code: naming, idiom, comment density. Ask before adding a dependency.
- Other sessions may write to this clone concurrently: check `git status` first, stage files by
  name (never `git add -A`), rebase rather than force-push.
- Never write `.env`, keys, or credentials through Claude (the hook blocks it; hand them to the owner).
- Kill every process you start (dev servers, watchers, simulators) before you finish.

## Gotchas (grow this list — one line each: what went wrong → the rule)
- <YYYY-MM-DD> <what happened> → <the rule that prevents it>
