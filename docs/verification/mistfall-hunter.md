# Mistfall Hunter verification

## Automated quality gates

- Unit/component tests cover routing config, game validation, localized MDX isolation, frontmatter and asset validation, shell links, page composition, SEO metadata, and branded 404 behavior.
- Production build statically generates both locales for Landing, Classes, and Best Class Guide.
- English and Chinese root entries return one temporary redirect to their matching Landing Page.
- Browser inspection confirmed English self-canonical plus `en`, `zh-CN`, and `x-default` alternates.
- Browser inspection confirmed the Chinese page uses `lang="zh-CN"`, a Chinese self-canonical, and has no horizontal overflow at 390 × 844.

## Visual review

Desktop and mobile views retain the approved Farever-inspired structure: two-tier navigation, near-black purple palette, display serif headings, thin card borders, dense grids, full-width hero, stacked mobile content, bottom CTA, and large footer. BuildCodex branding and local official Steam images replace reference-site identity.

## Content and assets

Six official Steam screenshots are stored locally as WebP and documented in `public/assets/mistfall-hunter/SOURCES.md`. Official product facts are separated from dated editorial/community recommendations. No remote image hotlinks or competitor imagery are used.
