# TweakMC.pl

The TweakMC Minecraft network frontend uses React, TypeScript, Vite, Tailwind CSS and Three.js. The product interface is in Polish.

## Local development

Use Node.js 22.22.1 or later in the 22.x series, or Node.js 24 or later, with npm and Git. From the project root, run:

```sh
npm ci
npm run dev
```

Open the [development server](http://127.0.0.1:5173).

| Route    | View                                                                                                             |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| `/`      | Home page with the interactive globe, game modes, EarthSMP, joining instructions, supporter rankings and Discord |
| `/sklep` | Player wallet top-ups and recent purchases                                                                       |
| `/mapa`  | EarthSMP map preview and live Dynmap through the domain proxy                                                    |
| `/admin` | Demo dashboard for revenue, sections and appearance. The local preview password is `tweakmc2026`.                |

## Source organization

`src/main.tsx` loads the stylesheet and mounts React. `src/app.tsx` mounts the React Router provider. Define page URLs and home section links in `src/router/paths.ts` and register route components in `src/router/router.tsx`. The shop, map and admin pages load on demand.

| Directory                 | Responsibility                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `src/features/admin`      | Preview login, revenue, section settings and appearance                                      |
| `src/features/home`       | Landing page sections and their globe and tank scenes                                        |
| `src/features/map`        | Dynmap controls, iframe and map preview                                                      |
| `src/features/shop`       | Wallet balance, top-up form and checkout                                                     |
| `src/features/supporters` | Rankings and recent purchases shared by home and shop                                        |
| `src/router`              | Route paths, page matching, lazy feature loading and access to layout settings               |
| `src/layout`              | Shared page layout, navigation, footer, mobile controls and seasonal effects                 |
| `src/shared`              | Site configuration, themes, persistent settings, geographic data and UI used across features |

Each feature exposes its entry component through `index.ts`, for example `features/admin/index.ts` exports `admin.tsx`. Keep components, hooks, response types and preview data with the feature that owns them. Where a feature calls the backend, place each operation in its own kebab-case file and export it through the feature's `api/index.ts`. Use TanStack Query hooks for the lifecycle of reads and writes. API functions use fetch for HTTP and validate JSON with feature-local Zod schemas. Place standalone helpers in the owning feature's `utils` directory and cross-feature helpers in `shared`. Within the feature use relative imports. Use the `@/` alias for imports from elsewhere in `src`.

## Languages

The site opens in Polish. The language selector in the footer switches between Polish and English without leaving the current page. The browser remembers the selection locally. Keep `src/shared/i18n/locales/pl.json` and `en.json` in sync, including interpolation variables. Minecraft commands, Discord channel names and custom messages from the administrator keep their original text.

## Integrations

Set the Minecraft server address, Discord invite, Dynmap proxy and shop endpoints in `src/shared/config/site.ts`. The shop and dashboard use preview data by default. Enable `shopApiEnabled` and rebuild after connecting the Stripe backend and Minecraft plugin. The backend must authenticate admin requests. The preview PIN only controls access to the demo interface.

When the integration is enabled, each new page load reads public settings from `GET /api/settings` before rendering the routes. Serve a JSON object with the public fields written by the authenticated `POST /api/admin/settings` handler. Omitted fields use the application defaults. For example, `{"sections":{"shopPage":false}}` disables the shop for visitors. Serve this read endpoint without credentials. If it fails or takes longer than five seconds, the frontend uses the last settings saved in the browser, or the defaults on a first visit.

Route `/mapa/live/` and its assets through a same-origin reverse proxy to Dynmap before the SPA fallback. Vite provides that proxy for development and preview using `site.dynmapUrl`. The embedded view waits for Dynmap to initialize its map pane. On failure it displays the preview and offers a retry. The full-screen link opens the configured map URL directly.

## Quality checks

Run `npm test` to check formatting, strict TypeScript, ESLint, API response contracts and translation catalogs. Run each check separately with `npm run format`, `npm run types`, `npm run lint`, `npm run test-api` or `npm run test-i18n`. Use `npm run format-fix` and `npm run lint-fix` to apply fixes.

During installation, the `prepare` script configures Husky. Before a commit, lint-staged runs ESLint and Prettier on staged JavaScript and TypeScript files, including JSX and TSX. Prettier formats other supported staged files. The commit-msg hook checks English Conventional Commits, for example `fix(shop): validate the player name`.

## Production build

```sh
npm run build
npm run preview
```

Open the [production preview](http://127.0.0.1:4173). Deploy the contents of `dist/` including the supplied `.htaccess` for Apache or `_redirects` for compatible hosts. On Netlify or Cloudflare Pages, use `npm run build` as the build command and `dist` as the output directory. A built directory can also be uploaded with [Netlify Drop](https://app.netlify.com/drop).
