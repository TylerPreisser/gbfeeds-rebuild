#!/usr/bin/env bash
# THIS REPO'S CI GATE: the validating jobs of .github/workflows/deploy.yml in that workflow's order -- lint,
# type-check, test-unit (Gate 1), build (Gate 2), then the Playwright e2e job (Gate 3) -- on the Node 20 the
# workflow pins (20.11), sourced by scripts/ci-local.sh inside a CLEAN worktree ($WT). The first failing step
# ends the gate. deploy.yml is UNCHANGED (it also deploys); keep this in step with its jobs.
#
# NOT mirrored: the Lighthouse CI job (`lhci autorun --config=./lighthouserc.json`): a performance budget scored
# by a Chrome run, needing a global @lhci/cli and LHCI_GITHUB_APP_TOKEN, not a deterministic pass/fail on the
# code. It stays in deploy.yml only; ci_summary says so on every status.
CI_NODE=20
ci_steps() {
  run npm-ci . npm ci --no-audit --no-fund
  run lint . npm run lint
  run type-check . npm run type-check
  run test-unit . npm run test:unit
  # deploy.yml's build job feeds NEXT_PUBLIC_* from repo secrets (public build-time values, not readable from
  # here). With none set, scripts/verify-env.ts -- the first thing `npm run build` runs -- is in DEV mode and
  # only warns, and every reader of NEXT_PUBLIC_SITE_URL falls back to https://gbfeeds.com, so this is the
  # workflow's validate-*.ts + `next build` static export minus the inlined values. It still hard-fails if
  # RESEND_API_KEY or TURNSTILE_SECRET_KEY are in the build environment, as the workflow's would.
  run build . npm run build
  [ -f "$WT/out/index.html" ] || { echo "build left no out/index.html" >> "$LOG"; return 1; }
  # e2e: deploy.yml installs Chromium (`--with-deps` is apt on ubuntu; on this Mac the browser alone is the
  # step), serves out/, waits for it, runs the specs, kills the server.
  run e2e-install-chromium . npx playwright install chromium
  run e2e . e2e_on_ephemeral_port
}
# The workflow's "Serve out/ and run E2E tests" block, on a FREE port instead of its 4173: other sessions on this
# machine squat fixed ports, and playwright.config.ts (reuseExistingServer: true) would test a stranger's server
# on 4173 instead of this build. The config pins 4173 in baseURL and webServer, so the specs run through a config
# written INTO THE THROWAWAY WORKTREE that keeps everything else and points baseURL at the port; nothing is
# added to the repo. CI=true as on the runner (forbidOnly, one retry).
e2e_on_ephemeral_port() {
  local port pid rc
  port="$("$CI_PYTHON3" -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1])')"
  cat > playwright.ci-local.config.ts <<EOF
import { defineConfig } from '@playwright/test';
import base from './playwright.config';
export default defineConfig({ ...base, use: { ...base.use, baseURL: 'http://localhost:${port}' }, webServer: undefined });
EOF
  npx serve out -p "$port" --no-clipboard &
  pid=$!
  npx wait-on "http://localhost:$port" --timeout 30000 || { kill "$pid" 2>/dev/null; return 1; }
  if CI=true npx playwright test --config playwright.ci-local.config.ts; then rc=0; else rc=$?; fi
  kill "$pid" 2>/dev/null
  return $rc
}
ci_summary() {
  local unit e2e
  unit="$(grep -E '^ +Tests ' "$LOG" | tail -1 | sed -E 's/^ +//; s/ +/ /g')"
  e2e="$(grep -E '^ +[0-9]+ passed \(' "$LOG" | tail -1 | sed -E 's/^ +//')"
  printf 'unit: %s; built; e2e: %s; lighthouse not mirrored' "${unit:-?}" "${e2e:-?}"
}
