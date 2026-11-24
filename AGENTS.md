# Working on TweakMC

Read `AGENTS.md.local` before starting work if the file exists.

- Use the Node.js version in `.nvmrc` and the npm version specified by `packageManager`. Install dependencies with `npm ci`.
- Start the development server with `npm run dev`. Keep application code in `src/`, preserve the existing directory structure, and use kebab-case for file names.
- Write code, documentation, commit messages, and pull request titles and descriptions in English.
- Run `npm run check` and `npm run build` before submitting a change. For UI changes, also run `npm test` and check keyboard navigation.
- Use Conventional Commits. Describe the purpose of each pull request and how you tested the change.
