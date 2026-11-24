# Agent guidance

## Project

TweakMC is the frontend for a Minecraft server network. The public checkout contains the TypeScript application, its build tooling and its browser tests. Describe features in the README only when they are present in this checkout.

Read `AGENTS.md.local` before starting if it exists. It contains private instructions for this checkout and must remain untracked.

## Setup and commands

- Select the Node version in `.nvmrc` and the npm version in `package.json`. Use `npm ci` for a reproducible installation.
- Use `npm run dev` while editing. To verify what a static host will serve, run `npm run build` followed by `npm run preview`.
- Run `npm run check` for Prettier, ESLint and TypeScript. Use `npm run format-fix` or `npm run lint-fix` to apply fixes, then review the diff.
- For UI changes, install the Playwright browsers and run `npm test`. Setup and debugging commands are in the [README](README.md#browser-tests).

## Implementation

- Preserve the current layout of `src/`. The HTML entry is `index.html`, React mounts the page in `src/main.tsx`, and `src/styles.css` imports Tailwind. Use kebab-case for source file names and React naming conventions for components.
- Use the configured `tw-` prefix for Tailwind utilities. Keep the stylesheet import and Vite plugin consistent when changing the CSS pipeline.
- TypeScript checks the application with strict mode enabled. Narrow nullable DOM values before using them and address type errors where they arise.
- Use semantic elements, accessible names, keyboard-operable controls and visible focus. Respect reduced-motion preferences when adding animation.
- Write code, documentation, commit messages and PR text in English.

## Dependency changes

- Include `package.json` and the corresponding `package-lock.json` changes in the same commit. Verify a clean install with `npm ci` and check the result with `npm run audit`.
- Check peer dependency ranges when upgrading React, Vite or Tailwind. Test each [Dependabot group](.github/dependabot.yml) together. A major version upgrade can also require changes to the Vite configuration, stylesheet or application entry point.

## Validation and delivery

- Run `npm run check` and `npm run build` before handing off a change. Keep generated output, test reports and credentials out of commits.
- Add interaction coverage in `tests/e2e/` when a change introduces user-facing behavior. For layout or navigation changes, inspect narrow and wide viewports and try the affected flow with the keyboard. Report manual findings separately from the automated axe results.
- Give each commit one purpose. Use Conventional Commits for commit messages and PR titles. In the PR description, identify the change and the checks that passed, and call out anything that still needs verification.

## References

Use the [React documentation](https://react.dev/reference/react) for component behavior, the [Vite guide](https://vite.dev/guide/) for the build, the [Tailwind CSS documentation](https://tailwindcss.com/docs) for styling and the [Playwright documentation](https://playwright.dev/docs/intro) for test changes.
