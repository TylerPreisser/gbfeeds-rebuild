# Conditional Routing Decisions

> Locked at Phase 0. Updated only when a downstream phase produces evidence to revise.

---

## Stack

| Decision | Value | Reason |
|---|---|---|
| `NEW_BUILD_STACK` | Next.js 15 + React 19 + TypeScript + Tailwind v4 + Framer Motion + GSAP + Lenis | Default per RAIL spec; no `EXTRA_CONTEXT` override; static-export friendly |
| `output` mode | `output: 'export'` | Static export for edge-hosted CDN delivery |
| `images` | `unoptimized: true` | Required when `output: 'export'`; `image-editor-pro` will handle conversion at build prep time |
| Hosting | **Cloudflare Pages via Wrangler / GitHub Actions** | **OVERRIDE** — security-audit-expert (Phase 2 advisor) flagged that GitHub Pages cannot ship custom response headers (no CSP / HSTS / X-Frame-Options / Permissions-Policy). Cloudflare Pages allows `_headers` + `_redirects` files for full security posture. Same Next.js static export. Free tier sufficient. Tyler's other brand sites (C3 Hays, Preisser Tech) already deploy via Cloudflare Pages — pattern is proven. Decision date: 2026-05-06. |

---

## Existing-stack advisors (Phase 1)

| Advisor | Invoked? | Reason |
|---|---|---|
| `python-expert` / `django-expert` | NO | Existing site is rendered HTML, not a Django template tree |
| `php-expert` / `laravel-expert` | NO | Not PHP |
| `ruby-expert` / `rails-expert` | NO | Not Rails |
| `javascript-typescript-expert` | NO | Not a JS source codebase — just rendered output |
| Any framework expert | NO | Source is a `SiteSucker` mirror of a GoDaddy Website Builder 8 / Online Store rendered site. Content extraction = scrape the rendered HTML directly. No templating layer to consult. |

**Effective decision:** `codebase-cartographer` flies solo in Phase 1.

---

## Industry advisors (Phase 2 + Phase 8)

| Advisor | Invoked? | Reason |
|---|---|---|
| `fintech-security-expert` | NO | Standard DTC commerce, not financial services |
| `healthcare-hipaa-expert` | NO | No PHI |
| Other regulated-industry expert | NO | Outdoor / hunting niche has no special compliance regime beyond standard PCI handled by the processor of choice |

**Effective decision:** No specialist industry advisor; standard `security-audit-expert` covers the normal commerce / privacy concerns.

---

## Architecture council overrides (Phase 4 / Phase 5)

| Decision | Value | Reason |
|---|---|---|
| Architecture lead | `react-architect` + `nextjs-expert` | Default — rebuild is on Next.js |
| `vue-specialist` / `angular-expert` | NOT invoked | Default React stack |
| `microservices-architect` | NOT invoked | Static export, no backend complexity |

---

## AI / advanced features (Phase 5 / Phase 6)

| Feature | In scope? | Reason |
|---|---|---|
| LLM-driven search | NO | Not in original; not requested |
| RAG / chatbot | NO | Original uses Reamaze for live chat — preserve Reamaze, not replace |
| ML personalization | NO | Out of scope |

`prompt-engineering-specialist`, `rag-architecture-expert`, `llmops-engineer`, `llm-finetuning-expert` — **off roster for this engagement.**

---

## Hosting overrides (Phase 9)

| Decision | Value | Reason |
|---|---|---|
| Target | **Cloudflare Pages** | Security-advisor override (see Stack table). Phase 9 ships a `_headers` file with strict CSP, HSTS, X-Frame-Options, Permissions-Policy, COOP/COEP. |
| CI | GitHub Actions | Use `cloudflare/wrangler-action@v3` to deploy on push to `main`. Repo created on Tyler's GitHub (`gh repo create`). |
| Custom domain | _TBD — to be decided pre-deploy_ | Apex `gbfeeds.com` repoint requires DNS change; otherwise `*.pages.dev` URL is the live deliverable. |
| `aws-cloud-architect` / `terraform-infrastructure-expert` / `docker-specialist` / `kubernetes-expert` | NOT invoked | No container or cloud override |
| GitHub Pages | NOT used | Lacks header control needed for security posture. |

---

## Off-roster (do not invoke)

`alpha-scanner`, `conviction-scorer`, `pattern-matcher`, `portfolio-strategist`, `quant-analyzer`, `sentiment-engine` — stock-analysis specialists, irrelevant.

`ios-debug-mastermind`, `ios-swiftui-architect`, `dart-flutter-expert` — native mobile, irrelevant.

`r2-website-pm` — different engagement.

`r-squared-writer` — not an R Squared AI brand asset.

`machine-learning-engineer`, `python-data-scientist` — no ML/data work in this rebuild.
