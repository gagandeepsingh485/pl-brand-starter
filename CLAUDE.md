# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server (pages router).
- `npm run build` — production Next.js build.
- `npm run start` — serve the production build.
- `npm run deploy` — build with `@opennextjs/cloudflare` and deploy to Cloudflare Workers via Wrangler.

There is no test runner, lint script, or typecheck script configured. Both `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` are set to `true` in `next.config.ts`, so builds will not fail on type or lint errors — run `npx tsc --noEmit` manually if you need type verification.

Note: two Next configs exist (`next.config.ts` and `next.config.mjs`). Next.js prefers `next.config.ts`; the `.mjs` file is legacy/leftover and not used by the TS-aware toolchain.

## Environment

Required env vars (see `.env.sample`) consumed by `lib/api.ts` and `service/api.service.ts` to instantiate the `publive-cms-sdk` client:

- `NEXT_PUBLIC_PL_ENVIRONMENT` — `development` | `beta` | `production`
- `NEXT_PUBLIC_PL_PUBLISHER_ID`
- `NEXT_PUBLIC_PL_PUBLISHER_API_KEY`
- `NEXT_PUBLIC_PL_PUBLISHER_API_SECRET`
- `NEXT_PUBLIC_APP_URL`

Cloudflare environments (`beta`, `prod`) are declared in `wrangler.jsonc`; set their `vars` there for deploys.

## Architecture

This is a Publive CMS "starter app" — a Next.js 15 (pages router, React 19) site whose page content is defined by a CMS and rendered through a registry of local React components. It is deployed to Cloudflare Workers via OpenNext.

**Data flow — CMS-driven layout:**

1. A page's `getServerSideProps` (e.g. `pages/index.tsx`, `pages/post/[id].tsx`) instantiates `APIService` (`service/api.service.ts`), which wraps the `publive-cms-sdk` `Publive` client.
2. It fetches a `Post` whose `custom_entity.layout` is an ordered array of component descriptors: `{ schema_id, schema_slug, dynamic_fields }`.
3. `StaticLayoutRender` (`lib/FieldMap/index.tsx`) walks that array, looks each `schema_slug` up in `publive.config.ts`'s `componentMap`, and renders the mapped React component with `dynamic_fields[0]` spread as props.
4. `MainLayout` (`component/layout/index.tsx`) wraps pages with `Header`/`Footer`, hydrated from `Navbar` / `Footer` / `Publisher` data.

**Adding a new CMS-driven component:** create the component under `component/ui/<Name>/`, then register it in `publive.config.ts` under the `schema_slug` the CMS uses. Without this mapping, `StaticLayoutRender` silently renders nothing for that slug.

**Static fixtures:** `lib/data/page.js` exports `HomePageData`, `NavbarData`, `FooterData` used in place of live SDK calls in `pages/index.tsx` and `pages/post/[id].tsx`. The live SDK calls are present but commented out — swap when wiring real content.

**Deployment:** `open-next.config.ts` + `wrangler.jsonc` + `npm run deploy` compile the Next app into `.open-next/worker.js` and static assets, served from a Cloudflare Worker with `nodejs_compat`. `next.config.ts` calls `initOpenNextCloudflareForDev()` so `next dev` also loads the Cloudflare bindings shape (see the generated `cloudflare-env.d.ts`).

**TS path alias:** `@/*` → repo root (e.g. `@/component/ui/...`, `@/lib/api`). The `tsconfig.json` `paths` and `components.json` aliases disagree (`components.json` references `@/components` / `app/globals.css` which do not exist) — the tsconfig is authoritative. shadcn CLI will need its config adjusted before use.

**Styling:** Tailwind v4 via `@tailwindcss/postcss`; global styles in `styles/globals.css`; fonts (`Inter`, `Playfair Display`) are injected as CSS variables in `pages/_app.tsx`.

## gstack (recommended)

This project uses [gstack](https://github.com/garrytan/gstack) for AI-assisted workflows. Install for skills like `/qa`, `/ship`, `/review`, `/investigate`, `/browse`:

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --team
```

Use `/browse` for all web browsing. Use `~/.claude/skills/gstack/...` for gstack file paths.
