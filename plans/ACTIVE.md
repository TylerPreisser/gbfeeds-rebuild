# ACTIVE — the plan currently being executed

One plan at a time. Overwrite this file when a new plan starts; the finished one moves to
`plans/<YYYY-MM-DD>-<slug>.md`.

## Status
No active plan.

## How this is used
- **architect** writes the plan artifact here before any code is written; the plan is reviewed
  before step 1, because review leverage is highest at the plan.
- **implementer** executes ONE numbered step per invocation, red test first, and commits per green
  step in conventional-commit format.
- **evidence-reviewer** reads `REVIEW.md` and `DECISIONS/` on a fresh context and applies the
  citation bar there.
- A handoff written when the context band is exhausted goes to `plans/HANDOFF-<ts>.md` per
  `~/.claude/rules/handoff-quality.md`, and names this file as its plan pointer.

## Template
```
# PLAN — <title>
Goal (verbatim from the owner): "<...>"
Verification: npm run lint && npm run type-check && npm run test:unit && npm run build && npm run test:e2e
1. <step> — test that proves it: <path> — verify: <command> → expect: <output>
2. ...
Out of scope: <...>
```
