# BuildCodex Mistfall Hunter Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the bilingual, SEO-ready Mistfall Hunter landing, classes, and best-class guide experience at the approved BuildCodex routes.

**Architecture:** A Next.js App Router application uses `next-intl` with an internal `[locale]/[game]` route tree and `localePrefix: "as-needed"`. Focused registries validate games and localized MDX; shared page templates render English and Chinese content while a centralized SEO helper creates canonical and language alternates.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, next-intl, MDX via next-mdx-remote, gray-matter, Zod, Vitest, Testing Library, Playwright, CSS Modules/global CSS, local WebP assets.

## Global Constraints

- Work only in `/Users/wangkristen/tools/gamesites`; preserve the existing source Markdown files.
- English is default and unprefixed; Simplified Chinese uses `/zh-CN`.
- Implement only the six approved content URLs plus temporary `/` and `/zh-CN/` redirects.
- Use `app/[locale]/[game]/...`, `routing.ts`, `games.ts`, independent localized MDX, and message JSON.
- Do not silently fall back across locales; invalid locale, game, or slug returns the branded noindex 404.
- Canonical is self-referential; alternates include `en`, `zh-CN`, and English `x-default`.
- Match Farever Wiki's layout rhythm and visual hierarchy without copying its brand, logo, text, or derived assets.
- Use only official Mistfall Hunter website or Steam promotional images, store them locally, and record every source.
- Distinguish official facts from editorial, tested, or community-derived recommendations.
- Do not add unsupported World, Regions, Modes, News, Server Status, Steam Charts, Codes, or Bosses modules.

## File map

```text
app/[locale]/layout.tsx                         locale provider and static locale validation
app/[locale]/[game]/layout.tsx                  validated game shell
app/[locale]/[game]/page.tsx                    landing template composition
app/[locale]/[game]/classes/page.tsx            classes MDX template
app/[locale]/[game]/guides/[slug]/page.tsx      guide MDX template
app/[locale]/not-found.tsx                      branded localized 404
app/globals.css                                 tokens, reset, global responsive rules
app/page.tsx                                    temporary English entry redirect
app/[locale]/page.tsx                           temporary localized entry redirect
components/*                                    focused visual primitives and page sections
content/{locale}/{game}/*.mdx                   independent localized page content
i18n/routing.ts                                 locales and next-intl navigation
i18n/request.ts                                 request locale messages
lib/content.ts                                  MDX loading and validation
lib/games.ts                                    game registry and route descriptors
lib/seo.ts                                      canonical and hreflang generation
messages/{locale}.json                          shared UI translations
proxy.ts                                        next-intl request routing
public/assets/mistfall-hunter/*                  local official imagery and source log
tests/*                                         unit and route/SEO tests
e2e/*                                           browser acceptance and screenshot tests
```

---

### Task 1: Scaffold the tested Next.js application

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.mjs`
- Create: `app/globals.css`, `app/layout.tsx`
- Create: `tests/smoke.test.ts`
- Preserve: `Builds.md`, `Classes.md`, `Weapons.md`, `beginerGuide.md`, `keywords.json`, `关键字.md`

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `lint`, `test`, `test:e2e`; TypeScript alias `@/*`.

- [ ] **Step 1: Initialize Git without touching existing content files**

Run: `git init && git status --short`
Expected: existing research files appear as untracked; none are removed.

- [ ] **Step 2: Create the package manifest and install dependencies**

Use scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Run: `npm install next@latest react@latest react-dom@latest next-intl@latest next-mdx-remote@latest gray-matter@latest zod@latest && npm install -D typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest eslint@latest eslint-config-next@latest vitest@latest jsdom@latest @testing-library/react@latest @testing-library/jest-dom@latest @playwright/test@latest`
Expected: lockfile created with no install error.

- [ ] **Step 3: Write the failing smoke test**

```ts
import {describe, expect, it} from 'vitest';
import {siteConfig} from '@/lib/site';

describe('siteConfig', () => {
  it('uses BuildCodex and the production origin', () => {
    expect(siteConfig.name).toBe('BuildCodex');
    expect(siteConfig.origin).toBe('https://buildcodex.net');
  });
});
```

- [ ] **Step 4: Run the test and verify the missing module failure**

Run: `npm test -- tests/smoke.test.ts`
Expected: FAIL because `@/lib/site` does not exist.

- [ ] **Step 5: Add minimal config and root layout**

Create `lib/site.ts` exporting:

```ts
export const siteConfig = {
  name: 'BuildCodex',
  origin: 'https://buildcodex.net'
} as const;
```

Create a root layout importing `app/globals.css`, and configure TypeScript, Vitest alias resolution, ESLint, and Next.js trailing slashes.

- [ ] **Step 6: Verify scaffold**

Run: `npm test -- tests/smoke.test.ts && npm run lint`
Expected: PASS and zero lint errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts vitest.config.ts playwright.config.ts eslint.config.mjs app lib/site.ts tests/smoke.test.ts
git commit -m "chore: scaffold BuildCodex Next.js app"
```

### Task 2: Implement locale/game routing and strict validation

**Files:**
- Create: `i18n/routing.ts`, `i18n/request.ts`, `proxy.ts`
- Create: `lib/games.ts`, `messages/en.json`, `messages/zh-CN.json`
- Create: `app/[locale]/layout.tsx`, `app/[locale]/[game]/layout.tsx`
- Create: `app/page.tsx`, `app/[locale]/page.tsx`
- Test: `tests/routing.test.ts`, `tests/games.test.ts`

**Interfaces:**
- Produces: `routing`, `Link`, `redirect`, `usePathname`, `getPathname`; `Locale`; `getGame(slug): GameConfig | undefined`; `requireGame(slug): GameConfig`.

- [ ] **Step 1: Write routing and game registry tests**

```ts
expect(routing.defaultLocale).toBe('en');
expect(routing.locales).toEqual(['en', 'zh-CN']);
expect(routing.localePrefix).toBe('as-needed');
expect(requireGame('mistfall-hunter').slug).toBe('mistfall-hunter');
expect(() => requireGame('unknown')).toThrow('Unknown game');
```

- [ ] **Step 2: Verify tests fail**

Run: `npm test -- tests/routing.test.ts tests/games.test.ts`
Expected: FAIL because the routing modules do not exist.

- [ ] **Step 3: Implement centralized routing**

Use `defineRouting({locales: ['en', 'zh-CN'], defaultLocale: 'en', localePrefix: 'as-needed', localeDetection: false})`, `createNavigation(routing)`, `getRequestConfig`, and `createMiddleware(routing)` in `proxy.ts` with a matcher excluding `_next`, APIs, and files.

- [ ] **Step 4: Implement the game registry**

Define `GameConfig` with `slug`, localized names, `sections`, and route descriptors. Register only `mistfall-hunter`. Keep Builds/Weapons/Guides as localized landing anchors and Classes/Best Class as real routes.

- [ ] **Step 5: Implement layouts and temporary redirects**

Validate locale with `hasLocale`; validate game with `getGame`; call `notFound()` on failure. Use `redirect('/mistfall-hunter/')` for `/` and locale-aware `redirect({href: '/mistfall-hunter/', locale})` for the locale entry. Confirm Next.js emits temporary redirect semantics.

- [ ] **Step 6: Run routing tests**

Run: `npm test -- tests/routing.test.ts tests/games.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add i18n proxy.ts lib/games.ts messages app tests/routing.test.ts tests/games.test.ts
git commit -m "feat: add locale and game routing"
```

### Task 3: Build validated localized MDX infrastructure

**Files:**
- Create: `lib/content.ts`, `lib/content-schema.ts`, `components/mdx-components.tsx`
- Create: `content/en/mistfall-hunter/{landing,classes,guides/best-class}.mdx`
- Create: `content/zh-CN/mistfall-hunter/{landing,classes,guides/best-class}.mdx`
- Test: `tests/content.test.ts`
- Read: existing `Classes.md`, `Builds.md`, `Weapons.md`, `beginerGuide.md`

**Interfaces:**
- Produces: `ContentKind`, `ContentFrontmatter`, `loadContent({locale, game, path}): Promise<LoadedContent | null>`, `listGuideSlugs(locale, game): string[]`.

- [ ] **Step 1: Write schema and loader tests**

Test a valid fixture, a missing locale returning `null`, malformed frontmatter throwing a file-specific Zod error, and a referenced non-existent local image throwing `Missing local asset`.

- [ ] **Step 2: Verify loader tests fail**

Run: `npm test -- tests/content.test.ts`
Expected: FAIL because loader/schema modules are missing.

- [ ] **Step 3: Implement frontmatter validation and MDX loading**

Use `gray-matter`, Zod, `fs/promises`, and `compileMDX`. Reject path traversal, validate locale/game/slug agreement, and validate every declared `/assets/...` file under `public`.

- [ ] **Step 4: Audit source Markdown before conversion**

Create an implementation note listing which claims are official facts versus editorial/community conclusions. Do not copy unsupported numbers into MDX. Normalize `beginerGuide.md` only as an input filename; use `beginner-guide` in routes and content identifiers.

- [ ] **Step 5: Create six independent MDX documents**

Each document includes valid frontmatter and localized prose. Mark ranking content with `sourceNature: editorial` or `community-consensus`; use labels such as `Updated`, `Tested`, or localized equivalents in content.

- [ ] **Step 6: Verify content loading**

Run: `npm test -- tests/content.test.ts`
Expected: PASS for all six documents and strict missing-locale behavior.

- [ ] **Step 7: Commit**

```bash
git add lib/content.ts lib/content-schema.ts components/mdx-components.tsx content tests/content.test.ts
git commit -m "feat: add validated bilingual MDX content"
```

### Task 4: Acquire and document official local assets

**Files:**
- Create: `public/assets/mistfall-hunter/SOURCES.md`
- Create: `public/assets/mistfall-hunter/*.webp`
- Create: `scripts/verify-assets.mjs`
- Test: `tests/assets.test.ts`

**Interfaces:**
- Produces: stable local paths referenced by MDX and components; asset verifier exits non-zero for missing source records.

- [ ] **Step 1: Write asset-manifest test**

Require each `.webp` to have filename, official source URL, source label (`Official website` or `Steam`), and usage in `SOURCES.md`.

- [ ] **Step 2: Verify the test fails with no assets**

Run: `npm test -- tests/assets.test.ts`
Expected: FAIL because required hero and class assets are missing.

- [ ] **Step 3: Download only first-party promotional assets**

Inspect the Mistfall Hunter official site and Steam page, save hero/class/screenshot assets locally, and never download from Farever Wiki or another guide site. Record original URLs immediately.

- [ ] **Step 4: Convert and name assets**

Create at least `mistfall-hunter-hero.webp` plus verified class art using official class names. Use `mercenary.webp`, `sorcerer.webp`, `seer.webp`, or `shadowstrix.webp` only when the official source confirms those names and depicts the matching class.

- [ ] **Step 5: Run verification**

Run: `npm test -- tests/assets.test.ts && node scripts/verify-assets.mjs`
Expected: PASS; no remote image URL remains in content or components.

- [ ] **Step 6: Commit**

```bash
git add public/assets/mistfall-hunter scripts/verify-assets.mjs tests/assets.test.ts
git commit -m "assets: add official Mistfall Hunter media"
```

### Task 5: Implement the shared visual shell

**Files:**
- Create: `components/site-header.tsx`, `components/sub-nav.tsx`, `components/language-switcher.tsx`, `components/site-footer.tsx`
- Create: `components/cards/{class-card,build-card,weapon-card,guide-card,game-card}.tsx`
- Create: `components/sections/{hero,stats-strip,section-heading,fact-grid,faq-list,bottom-cta}.tsx`
- Create: `components/article-shell.tsx`
- Modify: `app/globals.css`, `app/[locale]/[game]/layout.tsx`
- Test: `tests/components/shell.test.tsx`

**Interfaces:**
- Produces: presentational components with explicit props; `SiteHeaderProps {locale, game, navigation}` and `LanguageSwitcherProps {locale, pathname, availableLocales}`.

- [ ] **Step 1: Write failing component tests**

Assert two navigation tiers, correct localized links/anchors, language switch preserving semantic paths, accessible menu labels, and no unimplemented `/builds/` or `/weapons/` links.

- [ ] **Step 2: Verify tests fail**

Run: `npm test -- tests/components/shell.test.tsx`
Expected: FAIL because shared components are missing.

- [ ] **Step 3: Implement visual tokens and shell**

Define near-black purple backgrounds, light foreground, vivid violet accent, border colors, max widths, typography scale, section spacing, card radii, focus rings, and mobile breakpoints as CSS variables. Implement the two-tier header and large footer using translation messages.

- [ ] **Step 4: Implement focused content primitives**

Each card accepts text, optional image, localized href, and label props. `GameCard` is implemented but unused. Keep components server-renderable except the mobile menu/language interaction boundary.

- [ ] **Step 5: Run component tests**

Run: `npm test -- tests/components/shell.test.tsx && npm run lint`
Expected: PASS with no dead category routes.

- [ ] **Step 6: Commit**

```bash
git add components app/globals.css app/[locale]/[game]/layout.tsx tests/components
git commit -m "feat: build the BuildCodex visual shell"
```

### Task 6: Compose the three bilingual page templates

**Files:**
- Modify: `app/[locale]/[game]/page.tsx`
- Modify: `app/[locale]/[game]/classes/page.tsx`
- Modify: `app/[locale]/[game]/guides/[slug]/page.tsx`
- Create: `components/pages/mistfall-landing.tsx`, `components/pages/classes-page.tsx`, `components/pages/guide-page.tsx`
- Test: `tests/pages.test.tsx`

**Interfaces:**
- Consumes: `loadContent`, registries, shared shell/components.
- Produces: the six approved localized pages and static params.

- [ ] **Step 1: Write failing page composition tests**

Assert Landing sections appear in the exact approved order; Classes contains its comparison/deep-dive/FAQ areas; Best Class contains title, summary, updated date, TOC, tier sections, comparison, recommendation, related content, and footer.

- [ ] **Step 2: Verify page tests fail**

Run: `npm test -- tests/pages.test.tsx`
Expected: FAIL because page components do not exist.

- [ ] **Step 3: Compose Landing Page**

Render: Hero → Stats Strip → What Is + Quick Facts → Classes → Guides → Builds & Recommendations → Featured Guides → FAQ → Bottom CTA → Footer. Add stable `#guides`, `#builds`, and `#weapons` anchors.

- [ ] **Step 4: Compose Classes and Guide pages**

Use the narrow `ArticleShell`. Render the localized MDX and generated heading TOC. Do not add unsupported modules.

- [ ] **Step 5: Add strict static params**

Generate only `mistfall-hunter`, both locales, and `best-class`; call `notFound()` for every missing content result.

- [ ] **Step 6: Run page tests**

Run: `npm test -- tests/pages.test.tsx`
Expected: PASS in both locales.

- [ ] **Step 7: Commit**

```bash
git add app/[locale]/[game] components/pages tests/pages.test.tsx
git commit -m "feat: add Mistfall Hunter page templates"
```

### Task 7: Add SEO metadata and branded 404 behavior

**Files:**
- Create: `lib/seo.ts`, `app/[locale]/not-found.tsx`, `components/not-found-page.tsx`
- Modify: all three page route files
- Test: `tests/seo.test.ts`, `tests/not-found.test.tsx`

**Interfaces:**
- Produces: `buildLocalizedMetadata({locale, pathname, title, description, image?}): Metadata`; branded `NotFoundPage`.

- [ ] **Step 1: Write failing metadata tests**

For English and Chinese examples assert self-canonical URLs, `en`, `zh-CN`, and English `x-default`. Assert the 404 robots metadata is `{index: false, follow: false}` and links only to valid routes/anchors.

- [ ] **Step 2: Verify tests fail**

Run: `npm test -- tests/seo.test.ts tests/not-found.test.tsx`
Expected: FAIL because SEO and 404 modules are missing.

- [ ] **Step 3: Implement locale-aware metadata**

Build URLs from `siteConfig.origin`, never request headers. Ensure `/en` never appears. Wire each page's `generateMetadata` to validated localized frontmatter.

- [ ] **Step 4: Implement branded 404**

Reuse the BuildCodex shell and Mistfall Hunter visual tokens. Offer localized Landing, Classes, Builds anchor, Weapons anchor, and Guides anchor destinations. Keep strict validation unchanged.

- [ ] **Step 5: Run SEO tests**

Run: `npm test -- tests/seo.test.ts tests/not-found.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/seo.ts app components/not-found-page.tsx tests/seo.test.ts tests/not-found.test.tsx
git commit -m "feat: add localized SEO and branded 404"
```

### Task 8: Validate routes, visuals, accessibility, and production build

**Files:**
- Create: `e2e/routes.spec.ts`, `e2e/visual.spec.ts`, `e2e/accessibility.spec.ts`
- Create: `docs/verification/mistfall-hunter.md`
- Modify: implementation files only when a test proves a defect

**Interfaces:**
- Produces: reproducible acceptance suite and verification report.

- [ ] **Step 1: Write route acceptance tests**

Check all six URLs return 200, `/` and `/zh-CN/` redirect temporarily to the correct localized landing pages, invalid locale/game/slug show branded 404, and language switching preserves route semantics.

- [ ] **Step 2: Write SEO DOM tests**

For each route inspect `<link rel="canonical">`, alternate hreflang links, `<html lang>`, localized title/description, and 404 robots directives.

- [ ] **Step 3: Write screenshot tests**

Capture all three templates at 1440×1000 and 390×844. Store baselines in Playwright snapshots and compare structure, section density, typography hierarchy, card borders, spacing, and mobile stacking to the previously inspected Farever reference.

- [ ] **Step 4: Run the complete local verification**

Run: `npm test && npm run lint && npm run build`
Expected: all unit tests pass, lint is clean, and the production build emits only the approved static route combinations.

- [ ] **Step 5: Run browser acceptance and Lighthouse**

Run: `npm run test:e2e` followed by Lighthouse against the three English templates and spot checks on Chinese. Record scores and any accepted visual tradeoffs in `docs/verification/mistfall-hunter.md`; severe accessibility or SEO findings must be fixed.

- [ ] **Step 6: Confirm the source policy**

Search for remote image URLs and competitor domains. Expected: no hotlinks, no copied Farever branding/assets, every local official image listed in `SOURCES.md`, and editorial labels visible on recommendation content.

- [ ] **Step 7: Commit**

```bash
git add e2e docs/verification playwright.config.ts
git commit -m "test: verify Mistfall Hunter site experience"
```

## Completion definition

The work is complete only when all six pages render in a production build, both entry redirects are temporary, strict 404s use the branded noindex page, locale switching is semantic, SEO alternates are correct, official assets are local and sourced, unsupported content is absent, MDX validation passes, and desktop/mobile visual checks confirm the approved Farever-inspired skeleton.
