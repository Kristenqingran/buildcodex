# BuildCodex Mistfall Hunter Site Design

## Objective

Build the first reusable single-game experience for BuildCodex. The initial game is Mistfall Hunter. The site will reproduce the page skeleton, density, visual rhythm, dark palette, purple accents, card borders, spacing hierarchy, and responsive stacking of `farevergame.wiki`, while using only BuildCodex branding, Mistfall Hunter content, and approved Mistfall Hunter promotional assets.

This phase proves the reusable flow:

1. Single-game landing page
2. Category/navigation content page
3. MDX guide detail page

It does not implement the future multi-game BuildCodex home page.

## Scope

### Public routes

English is the default locale and has no locale prefix:

- `/mistfall-hunter/`
- `/mistfall-hunter/classes/`
- `/mistfall-hunter/guides/best-class/`

Simplified Chinese uses the `zh-CN` prefix:

- `/zh-CN/mistfall-hunter/`
- `/zh-CN/mistfall-hunter/classes/`
- `/zh-CN/mistfall-hunter/guides/best-class/`

Temporary entry redirects:

- `/` redirects temporarily to `/mistfall-hunter/`
- `/zh-CN/` redirects temporarily to `/zh-CN/mistfall-hunter/`

These redirects must not be permanent because `/` will later become the BuildCodex multi-game collection page.

### Content boundaries

The initial content model contains only:

- Classes
- Guides
- Weapons
- Builds

The site must not invent World/Regions/Modes, Latest News, Server Status, Steam Charts, Codes, Bosses, or other unsupported modules merely to mirror the reference site.

## Architecture

Use Next.js App Router with an internal locale and game dimension:

```text
app/
  [locale]/
    [game]/
      page.tsx
      classes/page.tsx
      guides/[slug]/page.tsx
content/
  en/mistfall-hunter/
  zh-CN/mistfall-hunter/
messages/
  en.json
  zh-CN.json
public/assets/mistfall-hunter/
```

Use `next-intl` for locale routing, messages, navigation helpers, and metadata inputs. A central `routing.ts` defines supported locales, `en` as the default locale, and the prefix strategy. A central `games.ts` registry defines valid game slugs, display names, available sections, content roots, and baseline SEO information.

The internal route always includes `[locale]`. Middleware/rewrite behavior exposes English without `/en` and exposes all non-default locales with an explicit prefix. Adding `de`, `es`, or `fr` later must require only locale configuration, messages, and localized content—not route or template restructuring.

`generateStaticParams` generates only configured locale/game/content combinations. Unknown locales, games, sections, or guide slugs return 404.

## Content and localization

English and Simplified Chinese use independent MDX files. Page templates own layout; MDX owns page-specific prose, tables, FAQ entries, recommendations, and related links. Shared interface text such as navigation, buttons, labels, and footer text lives in `messages/{locale}.json`.

MDX frontmatter includes, at minimum:

- `title`
- `description`
- `locale`
- `game`
- `slug`
- `updated`
- `heroImage` or explicitly declared image set where required
- `sourceNature` where the page contains editorial or tested conclusions

A build-time schema validates frontmatter and local image references. Missing required content or images fail the build with a specific error. Missing translations never silently fall back to another language.

Language switching preserves the semantic route. If a translation is unavailable, its locale option is disabled rather than redirecting to unrelated content.

## SEO

English is the primary SEO version. Every page generates metadata through one locale-aware helper.

For each English and Chinese page:

- canonical points to that exact language URL
- `hreflang="en"` points to the English URL
- `hreflang="zh-CN"` points to the Chinese URL
- `hreflang="x-default"` points to the corresponding English URL
- localized title and description come from MDX/frontmatter or locale messages

Invalid and 404 pages are `noindex`. Redirect entry routes are temporary and do not claim canonical ownership.

## Visual system

The UI closely follows the Farever Wiki reference for structure rather than copying its identity. Reproduce its dark near-black/purple background, light text, vivid purple accents, thin bordered cards, high information density, display-heading hierarchy, compact navigation, generous section rhythm, and mobile stacking.

Do not copy the reference site's logo, brand graphics, written content, or derived imagery. BuildCodex and Mistfall Hunter names, copy, navigation, and graphics replace reference branding.

Visual tokens live in CSS custom properties so all games share a stable system while allowing future game-specific imagery. Responsive behavior follows the reference site's component stacking and density; localization must not introduce a different layout.

## Shared shell and components

The header uses the reference site's two-tier structure.

Primary tier:

- BuildCodex / Mistfall Hunter brand area
- Best Builds
- Best Class
- Best Weapons
- primary CTA

Secondary tier:

- Classes
- Builds
- Weapons
- Guides

Only Classes has a standalone category page in this phase. Until dedicated Builds, Weapons, and Guides hubs are implemented, navigation must not create dead routes:

- Classes links to the localized `/mistfall-hunter/classes/` route
- Builds links to the localized landing page `#builds` section
- Weapons links to the localized landing page `#weapons` recommendation card/anchor
- Guides links to the localized landing page `#guides` section
- Best Class links to the localized `/mistfall-hunter/guides/best-class/` route

The navigation component receives route descriptors so these temporary anchors can later be replaced with standalone hubs without changing the shell.

Shared components:

- `SiteHeader`
- `SubNav`
- `Hero`
- `StatsStrip`
- `SectionHeading`
- `ClassCard`
- `BuildCard`
- `WeaponCard`
- `GuideCard`
- `FactGrid`
- `FaqList`
- `ArticleShell`
- `LanguageSwitcher`
- `SiteFooter`
- `GameCard` reserved for the future multi-game home page

Components have narrow responsibilities and receive locale-aware data rather than loading arbitrary content internally.

## Page designs

### Mistfall Hunter landing page

The section order is fixed for the first release:

1. Hero
2. Stats Strip
3. What is Mistfall Hunter? and Quick Facts
4. Classes
5. Start Your Journey / Guides
6. Builds & Recommendations
7. Featured Guides
8. FAQ
9. Bottom CTA
10. Large Footer

The Builds & Recommendations section reuses the card rhythm of the reference site's Tools & Tier Lists area, but contains only:

- Best Builds
- Best Class
- Best Weapons
- Beginner Guide

It exposes stable `#builds` and `#weapons` anchors; Start Your Journey / Guides exposes `#guides`. These anchors support the first-release navigation without implying unimplemented category pages.

### Classes page

`/[locale]/mistfall-hunter/classes/` uses the reference site's narrow article layout and acts as both a category entry point and substantive content page. It includes a category label, title, summary, class comparison content, class deep dives/cards, FAQ, related links, and the shared footer.

### Best Class guide

`/[locale]/mistfall-hunter/guides/best-class/` uses the reusable MDX guide template with:

- Title
- Summary
- Updated date
- Table of contents
- Tier sections
- Comparison table
- Recommendation
- Related content
- Shared footer

## Asset policy

Only publicly displayed official Mistfall Hunter promotional assets from the official website or Steam storefront may be downloaded for the site. Allowed assets include hero art, class promotional art, screenshots, and backgrounds.

Assets must:

- be stored locally under `public/assets/mistfall-hunter/`
- use descriptive names such as `mistfall-hunter-hero.webp`, `mercenary.webp`, `sorcerer.webp`, `seer.webp`, and `shadowstrix.webp`
- be optimized to WebP where appropriate
- be rendered through local `next/image` references
- have their source URL and source type recorded in `public/assets/mistfall-hunter/SOURCES.md`

Do not download imagery from other guide sites, wikis, or competitors. If an exact reference-site image role cannot be filled from official sources, substitute another official image rather than using competitor material or hotlinking.

## Source and editorial policy

Official facts—game premise, class and weapon names, numerical values, dates, and product details—must preferentially come from the Mistfall Hunter official website, Steam, or another first-party source.

Builds, Best Class rankings, tier lists, and recommendations may use editorial judgment, actual game testing, or public community discussion. Pages must distinguish these conclusions from official facts. Appropriate labels include `Updated`, `Tested`, `Editorial recommendation`, and `Community consensus`. Unconfirmed information must not be presented as an official fact.

## Error handling

Invalid locale, game, section, slug, or missing localized MDX content returns a strict 404.

The project includes a custom BuildCodex/Mistfall Hunter 404 rather than the default Next.js page. It retains the site shell and visual language, is marked `noindex`, and offers:

- return to the locale-matching Mistfall Hunter landing page
- links to Classes, Builds, Weapons, and Guides

On the initial release, the Classes link targets the localized Classes page and the other category links target the localized landing-page anchors defined above. The 404 page must not link to unimplemented routes.

The custom 404 does not weaken route validation or substitute content from another locale.

## Verification and acceptance criteria

Automated checks cover:

- all six public content routes
- both temporary entry redirects
- invalid locale, game, and slug 404 behavior
- locale-preserving navigation and language switching
- canonical URL for each localized page
- `en`, `zh-CN`, and `x-default` alternates
- `noindex` on 404 pages
- frontmatter schema validation
- local asset existence validation

A production build must succeed and prove static generation and MDX compilation. Desktop and mobile screenshots of all page templates are compared with Farever Wiki for structure, density, spacing, typography hierarchy, card treatment, and responsive stacking.

Lighthouse is a baseline quality gate: no severe accessibility or SEO errors, explicit image dimensions, optimized local assets, usable focus states, and semantic headings. Scores must not be improved by materially departing from the approved reference visual language.

## Future extension

Adding another game reuses the same templates and registry:

- `/game-name/`
- `/game-name/classes/`
- `/game-name/builds/`
- `/game-name/guides/guide-slug/`

Adding a locale requires configuration, messages, and localized MDX only. Once BuildCodex contains two or three games, `/` can replace its temporary redirect with a multi-game collection page and begin using `GameCard` without changing existing game URLs.
