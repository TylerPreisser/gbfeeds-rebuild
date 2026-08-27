# gbfeeds-rebuild (gbfeeds.com) — working rules for Claude Code

This file is an error ledger, not a manual: every rule below exists because its absence cost
something once. Keep it short; grow the Gotchas list when something goes wrong, delete rules
that stop earning their place. Deterministic gates live in `.claude/hooks/` (they block; this
file only advises).

## Stack
Next.js 15.5.15 App Router, static export (`output: 'export'` — `next.config.ts:7`) · React 19.2.6 ·
TypeScript 5.7.3 · Tailwind 4.2.4 · framer-motion 11 + GSAP 3 + Lenis · Zod 3 schemas · Vitest 2
(unit) + Playwright 1.51 (e2e). Node `>=20.11.0` (`package.json:6`).

## Build / test / deploy — every command below was RUN on this clone 2026-08-27
- Install: `npm ci` → `added 1123 packages, and audited 1124 packages in 52s`
- Lint: `npm run lint` (eslint 9 flat config) → exit 0, `5 problems (0 errors, 5 warnings)` (pre-existing)
- Types: `npm run type-check` (`tsc --noEmit`) → exit 0, no output
- Unit: `npm run test:unit` (`vitest run`, one-shot, never watch) → `Test Files 5 passed (5) / Tests 33 passed (33)`
- Build: `npm run build` → exit 0. Runs 5 `tsx scripts/validate-*.ts` gates BEFORE `next build` and
  writes `out/`. With no `.env` it is DEV mode and only WARNs on unset `NEXT_PUBLIC_*`; setting
  `CF_PAGES_BRANCH=main` turns those into hard failures (`scripts/verify-env.ts:13`).
- E2E: `npm run test:e2e` → `7 passed (4.4s)`. It serves `out/` on :4173 itself, so `npm run build` first.
- Dev: `npm run dev` → http://localhost:3000, `Ready in 1167ms`. Kill it before you finish.
- NOT verified here — do not cite as known-good: `npm run lighthouse`, `npm run build:analyze`, `npm start`.
- Deploy target: Cloudflare Pages project `gbfeeds-rebuild` (`wrangler.toml:5`), performed ONLY by
  `.github/workflows/deploy.yml` gate 4 on a `main` push. Never run `wrangler pages deploy` by hand —
  the hook blocks it and it needs the owner's explicit say-so (`ALLOW_DEPLOY=1`).
- Trunk / default branch: `main` — feature branches off it, PRs back into it, never commit to it directly.

## Key directories (pointers)
- `src/app/**` — App Router; route groups `(editorial)` / `(legal)` / `(shop)`; home = `src/app/page.tsx`.
- `src/components/{atomic,composite,decoration,motion,page}` — layered; import direction is ENFORCED
  by `eslint-plugin-boundaries` (`eslint.config.mjs:40`-`:78`), not by convention. See `.claude/rules/frontend.md`.
- `src/data/*.ts` — build-time product / harvest / nav content, RSC-only by default.
- `src/lib/*.ts` — `cn`, `seo`, `routes`, `validators`, `basePath`, `analytics`, `format`.
- `scripts/validate-*.ts` — the build's own gates; read the failing gate before "fixing" the data.
- `.context/` — the architecture + content spec docs this rebuild was written against.

## Domain terms
- **Harvest** — a customer trophy pin (`src/types/harvests.ts:9`); Greg edits `public/data/harvests.json`
  and `total_inches` there is the single canonical stat feeding `<AntlerInchesCounter>` (`:39`).
- **Pillar** — one of the four "GB Feeds Difference" content blocks (`src/data/pillars.ts:2`).
- **PDP** — product detail page at `/products/[slug]/` (trailing slash; `next.config.ts:8`).

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
Walk up from the working directory to find it (a parent workspace may own it).

**Two folders are in force at once.** `~/.claude-shared/DECISIONS/` holds the owner's UNIVERSAL
preference and policy decisions (cite as `GLOBAL ADR-NNNN`); this repo's `DECISIONS/` holds decisions
scoped to this codebase. A GLOBAL ADR is never shadowed by a repo that owns its own folder, and on
conflict **the GLOBAL ADR wins**. This repo may carve out an exception only via its own ADR that names
the GLOBAL ADR number and says why — silently contradicting one is a defect in the repo ADR.
- **Conformance to an Accepted ADR is NEVER a defect.** Do not "fix", re-add, or recommend re-adding what an ADR removed.
- **If you believe a settled decision is wrong, DO NOT change code or file a bug** — put a note under "Decision Concerns" in your review output citing the ADR number. Nothing more.
- **Accepted ADRs are immutable — supersede, never edit.** New decision = next number; the old file gets one line: `Status: Superseded by ADR-000N`.
- Deterministic gates live in `.claude/hooks/` (live-deploy block, ADR/secret protection); this file is advisory, the hooks are not.

### Record decisions as they happen — do not wait to be asked
When the owner settles a question, WRITE THE ADR IMMEDIATELY as `Status: Accepted`, then say in
one line what you recorded and its number. Do not ask permission first.
- **Settled** = he picks between real alternatives, reverses something previously settled, or
  rules a course of action in or out. Architecture, libraries, schemas, boundaries, security
  posture, scope, workflow and tooling all count.
- **Not settled** = task direction ("fix this bug"), questions, thinking aloud, an option still
  being weighed. If he has not landed on it, there is nothing to record.
- **Route by scope:** universal preference/policy → `~/.claude-shared/DECISIONS/`; specific to this
  codebase → this repo's `DECISIONS/`. Client-specific rules are NOT universal.
- Next free `NNNN`, never reused; start from `DECISIONS/0000-template.md`. Quote what he actually
  said and cite where. Say under "Open / not yet decided" what the ADR does NOT settle.
- A wrong capture is fixed by SUPERSEDING, not editing (that write needs `ADR_SUPERSEDE=1`).
- `/decide` forces a capture on demand; the rule above is automatic and does not need it.

## Repo etiquette
- Match surrounding code: naming, idiom, comment density. Ask before adding a dependency.
- Other sessions may write to this clone concurrently: check `git status` first, stage files by
  name (never `git add -A`), rebase rather than force-push.
- Never write `.env`, keys, or credentials through Claude (the hook blocks it; hand them to the owner).
- Kill every process you start (dev servers, watchers, simulators) before you finish.

## Gotchas (grow this list — one line each: what went wrong → the rule)
- <YYYY-MM-DD> <what happened> → <the rule that prevents it>

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
