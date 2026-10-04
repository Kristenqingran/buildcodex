<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## BuildCodex deployment workflow

Every development change must follow this release sequence:

1. Run and review the site locally first.
2. After local approval, deploy the current changes to the `test` branch/environment and wait for the owner to review that deployment.
3. Only after the owner explicitly confirms the test deployment is approved may the changes be merged into `main` and deployed to production.

Production must represent the `main` branch. Do not deploy production directly from `test`, a feature branch, or an unmerged local worktree. Before every deployment, verify Vercel authorization; if it reports `Not authorized`, run `vercel login` and complete browser/device authorization first.
