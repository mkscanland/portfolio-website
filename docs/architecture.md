# Site architecture

This is a Vue 3 single-page portfolio built with Vite and Vue Router. It has no application backend in this repository. Pages describe work and link to static files; avoid inferring details about the systems described by those pages.

```mermaid
flowchart TD
  Entry["src/main.js"] --> Shell["src/App/App.vue"]
  Entry --> Router["src/router/index.js"]
  Shell --> Outlet["RouterView"]
  Shell --> Shared["src/components/"]
  Router --> Pages["src/views/"]
  Pages --> Outlet
```

| Location | Responsibility |
| --- | --- |
| `src/main.js` | Import site styles and libraries, register the router, and mount the app. |
| `src/App/App.vue` | Shared shell with `NavBar`, `RouterView`, and `SiteFooter`. |
| `src/router/index.js` | URL-to-view mapping. The home view is imported directly; other views use route-level dynamic imports. |
| `src/views/<Name>/<Name>.vue` | One route's portfolio content. Each tested view keeps `<Name>.spec.js` beside the component. |
| `src/components/<Name>/<Name>.vue` | Reusable UI, with its test beside it when behavior or rendered content warrants testing. |
| `src/components/ProjectDetailLayout/` | Shared hero and two-column project page structure. Views fill named subtitle, intro, and sidebar slots, plus the default article slot. |
| `src/components/ProjectCard/` | Image and overlay frame for project grids. Views supply optional metadata and description slots; interactive cards emit a selection event. |
| `src/content/` | Static portfolio content shared by a view's cards and modal. Keep one data object per project so displayed summaries and detail content do not drift. |
| `src/assets/css/legacy.css`, `src/assets/css/main.css`, `src/assets/css/site.css`, `src/assets/images/` | `legacy.css` sets the layer order and loads `site.css` and Bootstrap with their original grid precision. `main.css` supplies Tailwind's theme and utilities. Font Awesome remains an unlayered import in `src/main.js`. |
| `public/files/` | Files served directly from `/files/...`, including the resume. |
| `vite.config.js`, `vitest.config.js` | Build/alias and test setup. `@` points to `src/`; Vitest uses jsdom. |
| `e2e/`, `playwright.config.js`, `scripts/visual-compare.sh` | Playwright screenshot tests compare the current build against a build of the base branch. |
| `.github/workflows/deploy.yml` | Builds, tests, lints, and visually compares PRs; deploys a successful push to `main` to S3 and invalidates CloudFront. |

## Trace a page change

For `/rulesengine`, start at the route in `src/router/index.js`, then read `src/views/RulesEngine/RulesEngine.vue` and its colocated `RulesEngine.spec.js`. Check `src/components/NavBar/NavBar.vue` and `src/views/HomeView/HomeView.vue` for links to the page. Reuse the relevant styles in `src/assets/css/site.css` and existing Bootstrap utilities.

When adding a page, create its view directory and colocated test, register the route, and add navigation or project links where appropriate. When changing shared UI, inspect its other callers and test the behavior they depend on.

The `/annualreports` route currently contains content substantially repeated from `/validations`. Its content should be reviewed with the owner before either page's claims or route are changed.
