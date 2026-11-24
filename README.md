# TweakMC

[![CI](https://github.com/damianlampa/tweakmc-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/damianlampa/tweakmc-web/actions/workflows/ci.yml?query=branch%3Amain)

TweakMC is a website for a Minecraft server network. The public site currently serves a single English page with the message "Website coming soon." It uses React 19, Vite 8 and Tailwind CSS 4.

## Development

Use Node.js 26.13.1 and npm 12.2.3. The project pins Node in [`.nvmrc`](.nvmrc) and npm in the `packageManager` field of [`package.json`](package.json). Install the dependencies and start Vite from the repository root.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:5173>. Edit [`src/main.jsx`](src/main.jsx) to change the page and [`src/styles.css`](src/styles.css) to change its stylesheet. The stylesheet sets the Tailwind prefix to `tw`, so utility classes use names such as `tw:p-8`. Vite updates the page as you edit.

## Production build

```sh
npm run build
npm run preview
```

The build writes static files to `dist/`. Open <http://127.0.0.1:4173> to inspect those files locally. To deploy the same build to a static host, use `npm run build` as the build command and `dist/` as the publish directory.

## Code quality

Run `npm run check` for the same formatting, lint and type checks used in CI. Each check can also run individually.

| Command          | What it checks                                                                        |
| ---------------- | ------------------------------------------------------------------------------------- |
| `npm run format` | Prettier formatting. Use `npm run format-fix` to write fixes.                         |
| `npm run lint`   | ESLint rules, including React Hooks. Use `npm run lint-fix` to apply available fixes. |
| `npm run types`  | TypeScript checks on the JavaScript and JSX files in `src/`.                          |
| `npm run audit`  | Known dependency vulnerabilities, including low-severity findings.                    |

## Browser tests

```sh
npm exec -- playwright install chromium firefox webkit
npm test
```

Playwright builds the site and starts its own preview on port `4174`. The suite checks the placeholder text, generated Tailwind spacing, horizontal overflow, uncaught page errors and accessibility with axe. It runs on desktop Chromium, Firefox and WebKit, plus Pixel 7 and iPhone 13 emulation. See the [test cases](tests/e2e/home.spec.js) and [browser configuration](playwright.config.js).

Use `npm run test:ui` to investigate a test interactively or `npm run test:report` to open the HTML report after a run. Failed tests retain screenshots and traces. In GitHub Actions, download the `browser-test-report` artifact from the workflow run.

## Contributions

Work on a focused branch and use Conventional Commits for commits and PR titles, for example `fix(ui): prevent horizontal overflow`. During `npm ci`, Husky installs the hooks that run ESLint and Prettier on staged files and validate the commit message with commitlint.

Pull requests into `main` require the quality checks and production build, dependency audit, browser tests and PR title check. Merge with squash once the checks pass and review conversations are resolved. See the [repository settings](.github/repository/README.md) and [CI workflow](.github/workflows/ci.yml).

Dependabot checks npm packages and GitHub Actions weekly. React and its types, Vite and its React plugin, and Tailwind and its Vite plugin each have a dedicated update group so related releases can be tested together. See the [Dependabot configuration](.github/dependabot.yml).

## License

All rights reserved for the author's original code and assets. Third-party components retain their own licenses. See [LICENSE](LICENSE).
