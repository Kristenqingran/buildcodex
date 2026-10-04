<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## BuildCodex deployment workflow

Every development change must follow this release sequence:

1. Start all code changes on the `test` branch. Never begin by modifying `main`.
2. Run the `test` branch locally and wait for the owner to review the local deployment.
3. After the owner approves the local version, deploy the `test` branch to its test deployment and wait for a second review.
4. Only after the owner explicitly confirms the test deployment is approved may the changes be merged into `main`.
5. After the merge, deploy `main` to Vercel production and verify the live result.

Production must represent the `main` branch. Do not modify `main`, deploy production directly from `test`, or deploy from an unmerged local worktree. Before every deployment, verify Vercel authorization; if it reports `Not authorized`, run `vercel login` and complete browser/device authorization first.
