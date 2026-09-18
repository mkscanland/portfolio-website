# Agent workflow

1. Read [architecture.md](architecture.md) and [conventions.md](conventions.md), then inspect the relevant route, view, component, test, and style files before editing.
2. Make the smallest coherent change. Update a colocated test when behavior or important page content changes. Keep documentation aligned with any changed route, structure, command, or deployment step.
3. Review the diff for accidental edits and unsupported portfolio claims. For uncertain content, ask the owner or leave a clearly marked placeholder.
4. **After finishing the task**, run these final checks from the repository root, in order:

   ```sh
   npm run test:unit -- --run
   npm run lint:check
   ```

   If either fails, fix the issue and rerun the affected check. Report a check you could not run and why. Run `npm run build` as well when changing app code, routing, build configuration, or assets.
5. Summarize the changed files, the reason for the change, and the check results in the PR. Follow the branch prefixes in [conventions.md](conventions.md).

Pull requests into `main` run build, unit tests, and the nonmutating lint check. Deployment only runs on a successful push to `main`.
