# TweakMC

TweakMC is a website for a Minecraft server network. This repository currently contains the development tools, CI workflow, and a placeholder page.

## Development

Use the Node.js version in `.nvmrc` and the npm version in `package.json`.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:5173> to view the site.

## Checks and builds

- Run `npm run check` to check formatting, lint the code, and verify types.
- Run `npm run build` to generate the production site in `dist/` and `npm run preview` to serve it locally.
- Run `npm run audit` to check dependencies for known vulnerabilities.
- Install browsers with `npm exec -- playwright install chromium firefox webkit`, then run `npm test`. The tests check the production page on desktop and mobile viewports and run automated accessibility checks with axe.

## Contributions

Husky runs ESLint and Prettier on staged files and validates commit messages with commitlint. Use Conventional Commits for commit messages and pull request titles. For required checks and squash merge settings, see the [repository settings](.github/repository/README.md).

## Copyright

All rights reserved. See [LICENSE](LICENSE) for the terms that apply to the project's original code and assets.
