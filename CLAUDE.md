# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.

## Development Commands

**Quality Checks (run after every code edit):**
```bash
npm run typecheck
npm run lint
npm run format:check  # if fails, run: npm run format
```

**Development:**
```bash
npm run dev                 # dev server with codegen
npm run build
npm run codegen             # generate Shopify GraphQL types
npm run sanity:typegen      # generate Sanity CMS types
npm run lint:fix
npm run format
```

**CMS Setup:**
```bash
npm run sanity:extract    # extract Sanity schema
npm run sanity:generate   # generate Sanity types
npm run create:initial    # create initial Sanity documents
npm run create:cors
npm run create:token
```

## Framework Stack

- **Shopify Hydrogen v2025.10.x** + **React Router v7** (NOT Remix) for routing/SSR
- **Sanity CMS** for content, studio at `/cms`
- **TypeScript** strict mode, **Tailwind CSS v4.x**, Node 20.x
- Deploy to **Cloudflare Workers** via `@shopify/mini-oxygen`
- Package manager: **npm** (package-lock.json present)

## Critical: React Router Imports

Never use `@remix-run/*` or `react-router-dom`. Always use `react-router`:

```typescript
// CORRECT
import { useLoaderData, Link, Form } from 'react-router';
```

Full replacement table for Remix → React Router v7:

| Remix v2 | React Router v7 |
|----------|----------------|
| `@remix-run/react` | `react-router` |
| `@remix-run/dev` | `@react-router/dev` |
| `@remix-run/cloudflare` | `@react-router/cloudflare` |
| `@remix-run/fs-routes` | `@react-router/fs-routes` |
| `@remix-run/node` | `@react-router/node` |
| `@remix-run/server-runtime` | `react-router` |

## File Naming

All new files/directories: **kebab-case** only (`product-card.tsx`, not `ProductCard.tsx`).

## Project Structure

```
app/
├── routes/              # file-based routing, ($locale) pattern
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── sections/       # CMS section components
│   ├── sanity/         # CMS integration
│   └── layout/
├── data/
│   ├── sanity/         # GROQ queries & fragments
│   └── shopify/        # Storefront API queries & fragments
├── lib/                # utilities & business logic
│   ├── section-resolver.ts   # section type → component map
│   └── resolve-shopify-promises.ts  # deferred Shopify data fetching
├── hooks/
├── sanity/             # Sanity Studio config & schema
└── styles/
```

## CMS Section System

### How sections work

1. Sanity returns a page/product/collection document with a `sections[]` array, each item has `_type` and `_key`.
2. `app/components/cms-section.tsx` (`CmsSection`) looks up `_type` in the `sections` map from `lib/section-resolver.ts` and renders the matching component.
3. Missing sections show a dev-only placeholder; in production they render nothing.

### Adding a new section

1. Create component in `app/components/sections/your-section.tsx`
2. Register it in `app/lib/section-resolver.ts`:
   ```typescript
   import {YourSection} from '~/components/sections/your-section';
   export const sections = {
     // ...existing
     yourSection: YourSection,
   };
   ```
3. If section needs Shopify data, add a resolver in `lib/resolve-shopify-promises.ts` and return the promise from the route loader.

### resolveShopifyPromises pattern

Route loaders call `resolveShopifyPromises({document, request, storefront})` which scans the page's section types and fires the appropriate Shopify queries as deferred promises. Section components `Await` these promises from `loaderData`. Uses `Promise.allSettled` so one failed fetch doesn't break the page.

## Routing

- File-based routing via `@react-router/fs-routes`, config in `routes.ts` with `hydrogenRoutes()`
- `($locale)._index.tsx` — localized home
- `($locale).$.tsx` — catch-all for CMS pages (fetches Sanity `PAGE_QUERY` by slug/handle)
- `($locale).products.$productHandle.tsx` / `($locale).collections.$collectionHandle.tsx` — templated via Sanity

## Sanity stegaClean

- Use `isType(obj, '_type')` from `~/utils/sanity-utils` for all `_type` union discriminations — never inline `stegaClean(x._type) === '...'` with `as Extract<>` casts
- Use `stegaClean()` directly for non-`_type` fields (slugs, documentType, aspectRatio, etc.)
- Never clean display/render text fields — stega encoding powers click-to-edit overlays in Sanity Presentation mode

## Sanity CMS

- Schema: `documents/` (page, product, collection), `objects/`, `singletons/` (header, footer, theme)
- GROQ queries in `app/data/sanity/queries.ts` use fragment helpers from `fragments.ts` and `sections.ts`
- `ROOT_QUERY` fetches global header/footer/theme on every request (loaded in `root.tsx`)
- Internationalized content via `sanity-plugin-internationalized-array`; queries accept `$language` and `$defaultLanguage` params
- Run `npm run sanity:typegen` after schema changes

## Styling

- Tailwind CSS v4.x with CSS variables for theming; design tokens managed via Sanity singletons
- `motion` library for animations
- Section-level color scheme overrides injected via `<style>` tags using `useColorsCssVars` hook

## Environment Variables

```
# Shopify
PUBLIC_STORE_DOMAIN
PUBLIC_STOREFRONT_API_TOKEN
PRIVATE_STOREFRONT_API_TOKEN
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID

# Sanity
PUBLIC_SANITY_STUDIO_PROJECT_ID
PUBLIC_SANITY_STUDIO_DATASET
SANITY_STUDIO_TOKEN

# Sessions
SESSION_SECRET
```

## Plans

- At the end of each plan, give me a list of unresolved questions to answer, if any. Make the questions extremely concise. Sacrifice grammar for the sake of concision.
