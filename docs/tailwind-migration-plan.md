# Tailwind CSS migration plan for `portfolio-website`

This plan is for an implementing agent. It moves the site from Bootstrap 5.3.8 to Tailwind CSS v4 with Reka UI, and the finished site must look the same as today. Follow the steps in order. Every command, file path, class mapping and code snippet below was checked against the current repo and the pinned package versions.

---

## 0. Read this first

### 0.1 Goal and non-goals

- **Goal:** replace Bootstrap's CSS and JavaScript with Tailwind CSS v4 (layout and utility classes) and Reka UI (the navbar, its dropdowns and the project modal). The finished site must look the same as the current production site.
- **Non-goals:**
  - No redesign.
  - No wording changes, except the footer sentence in PR 7.
  - No new pages.
  - No changes to `/annualreports` content (see `docs/architecture.md`).
  - Don't swap Font Awesome for another icon set.
  - Don't delete images other than `under-development.png`.

### 0.2 Decisions already made (don't revisit them)

| Topic | Decision |
|---|---|
| How close the match must be | Visually identical. Screenshot comparison with `maxDiffPixelRatio: 0.001`. |
| Interactive components | Reka UI (`reka-ui@^2.10.5`): `NavigationMenu`, `Collapsible`, `Dialog`. |
| Delivery | 7 small PRs, each mergeable and deployable on its own, in the order below. |
| Also in scope | Footer text update, `RouterLink` for internal links, permanent screenshot tests in CI, and removing unused files (5 icon components plus `UnderDevelopment`). |
| Browser support | Tailwind v4 baseline: Safari 16.4+, Chrome 111+, Firefox 128+. |
| Mobile menu animation | Bootstrap's 0.35s height animation when the mobile menu opens is dropped on purpose (see 2.7). |
| "Home" nav link | Stays highlighted on every page, as it is today (`class="nav-link active"`). |

### 0.3 Rules for every PR

1. Make **only** the changes listed for that PR. If something else looks wrong, note it in the PR description and don't fix it.
2. **Every PR except PR 7 must have zero screenshot differences** against `main`. If a difference appears, fix your change. Never update or accept screenshots to make a check pass.
3. Don't run `npm run format` or Prettier on whole files, because it reformats code you didn't change. Match the surrounding formatting by hand: 2-space indent, single quotes, no semicolons.
4. Don't use `@apply`. Don't add `prettier-plugin-tailwindcss`.
5. Don't change `src/content/`, route paths, element `id`s, `aria-label`s, or any text, unless a step says to.
6. Keep existing test assertions unless a step says to change a selector. Tests describe what the site does.
7. Write commit messages and PR titles in the imperative, sentence case, like the repo history (for example "Add visual regression tests").
8. **Stop and report instead of improvising** when:
   - a screenshot difference persists after two fix attempts,
   - a Reka UI prop or behavior doesn't match this plan, or
   - a CI image or package version doesn't exist.

   Include the exact error output.

### 0.4 Branches and PRs

- Base every PR on the latest `main`. Open PR N+1 only after PR N has merged.
- If you're assigned a fixed branch name, reuse it for each PR. After the previous PR merges, recreate the branch from `main`:
  ```sh
  git fetch origin main
  git checkout -B <assigned-branch> origin/main
  git push --force-with-lease -u origin <assigned-branch>
  ```
- If you can choose the name, use `feature/tailwind-<n>-<slug>` (see `docs/conventions.md`), for example `feature/tailwind-1-visual-tests`.
- The repo has no PR template. Use these sections in the PR description: **Summary**, **Changes**, **Checks** (paste the command results), **Visual comparison** (the result line from the compare script), and **Notes**.

### 0.5 Definition of done for every PR

Run these from the repo root. All must pass before you push:

```sh
npm run test:unit -- --run
npm run lint:check
npm run build
npm run test:visual:compare -- origin/main   # exists from PR 1 on; zero failures (PR 7: expected footer diffs only)
```

In the Claude Code cloud container, Playwright must use the preinstalled Chromium, and browsers must not be downloaded:

```sh
PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:visual:compare -- origin/main
```

In environments where downloading is allowed, run `npx playwright install chromium` once instead. If Playwright can't launch any browser, say so in the PR and rely on the CI **Visual regression** job.

---

## 1. Facts about the codebase

- **Stack:** Vue 3.5, Vite 7, Vue Router 5, Vitest 4 with jsdom, ESLint 9 flat config plus Oxlint. The package is ES modules (`"type": "module"`). CI runs Node 20 (`.github/workflows/deploy.yml`).
- **Styles today** (`src/main.js`): `./assets/css/site.css`, then `bootstrap/dist/css/bootstrap.min.css`, then `import 'bootstrap'` (the JavaScript), then Font Awesome CSS.
  - Because Bootstrap loads *after* `site.css`, Bootstrap wins ties. Example: `site.css`'s `body { background-color: #212529 }` is overridden by Bootstrap's reset, so the body is white. **Keep that behavior.**
- **Bootstrap JavaScript is used in three places only:**
  - the mobile collapse and 4 dropdowns in `src/components/NavBar/NavBar.vue`
  - the modal in `src/views/WebApplications/WebApplications.vue` (the `data-bs-toggle="modal"` attributes on `ProjectCard` usages at lines 103–104 and 139–140)
- **Desktop dropdowns open on hover** through CSS in `site.css` lines 1–11, at widths of 900px and up. The navbar collapses below 992px (`navbar-expand-lg`).
- **Section colors depend on Bootstrap class names:** `site.css` selectors like `.bg-light .title` and `.wrapperSection.bg-orange` color the section ribbons. Bootstrap's `.bg-light`, `.bg-dark` and `.bg-white` are `!important`, so the *effective* background of `.wrapperSection.bg-light` is `#f8f9fa`, not the `#ffffff` written in `site.css`.
- **Tests that depend on Bootstrap class names:**
  - `ProjectDetailLayout.spec.js` uses `.col-lg-6`, `.border-bottom` and `.col-md-4`.
  - `UnderDevelopment.spec.js` uses `.container`.
  - `SiteFooter.spec.js` uses `footer.footer` and expects the text `Bootstrap`.
- **Unused files:**
  - `src/components/icons/*.vue` (5 files)
  - `src/components/UnderDevelopment/` (the component and its spec)
  - `src/assets/images/under-development.png` (only `UnderDevelopment` uses it)
  - These `site.css` rules match nothing: `.blue`, `.blue.textBorder`, `.mainWrapper`, `.projectImg`.
- **`vitest.config.js` already excludes `e2e/**`**, and `.gitignore` already ignores `__screenshots__/`.
- **Only two retained class names are also Tailwind utilities: `container` and `collapse`.** I checked this with the Tailwind CLI. The plan renames `container` to `bs-container` and removes `collapse`.

---

## 2. Reference tables (used by PRs 3–6)

### 2.1 How the CSS is layered

Tailwind utilities go in a CSS **cascade layer** declared after the Bootstrap and `site.css` layer, so a utility class always beats a normal Bootstrap or `site.css` rule, whatever the selector specificity. `!important` rules in the earlier layer still win. Only Bootstrap's own utility classes use `!important`, and those are removed element by element.

In PRs 3–5, Tailwind classes carry the `tw:` prefix (for example `tw:px-6` or `tw:md:w-8/12`). This is needed while Bootstrap is loaded, because the two frameworks share class names with different values (`px-4` is 1.5rem in Bootstrap and 1rem in Tailwind). PR 6 removes the prefix.

**Important:** a utility now overrides `site.css` even where `site.css` used to win by being more specific. The only such conflicts are `img-fluid`, which Bootstrap doesn't mark `!important`, on two elements. The mapping table covers both (the `ProjectCard` image and the modal image).

### 2.2 Spacing scale

| Bootstrap step | Size | Tailwind step |
|---|---|---|
| 0 | 0 | 0 |
| 1 | 0.25rem | 1 |
| 2 | 0.5rem | 2 |
| 3 | 1rem | 4 |
| 4 | 1.5rem | 6 |
| 5 | 3rem | 12 |

This applies to `p`, `m`, `px`, `py`, `pt`, `pb`, `mb`, `mt`, `mx`, `me` and `gap`. Responsive forms move the breakpoint to the front: `py-lg-5` becomes `tw:lg:py-12`, and `me-sm-3` becomes `tw:sm:me-4`.

**Rule:** never put two utilities that set the same side on one element. For example, `py-0 pb-5` becomes `tw:pt-0 tw:pb-12`, not `tw:py-0 tw:pb-12`.

### 2.3 Replacing every class string in the repo

This table covers every static `class="..."` string in `src/**/*.vue`. The first column is the string *after* PR 4's section renames. Find the element, replace its whole class value, and leave all other attributes alone.

| Current class string | Replacement |
|---|---|
| `p-4 border-bottom bg-light rounded` | `tw:p-6 tw:border-b tw:border-bs-border tw:bg-light tw:rounded-md` |
| `p-4 mb-3 bg-light rounded` | `tw:p-6 tw:mb-4 tw:bg-light tw:rounded-md` |
| `fst-italic` | `tw:italic` |
| `col d-flex align-items-start` (inside a grid) | `tw:flex tw:items-start` |
| `col` (inside a grid) | remove the `class` attribute |
| `overflow-hidden` | `tw:overflow-hidden` (keep any inline `style`) |
| `img-fluid border rounded-3 shadow-lg mb-4` | `tw:max-w-full tw:h-auto tw:border tw:border-bs-border tw:rounded-lg tw:shadow-bs-lg tw:mb-6` |
| `container px-5 text-center` | `bs-container tw:px-12 tw:text-center` |
| `container px-4` | `bs-container tw:px-6` |
| `container px-4 py-5` | `bs-container tw:px-6 tw:py-12` |
| `pt-4` | `tw:pt-6` |
| `fw-bold mb-0` | `tw:font-bold tw:mb-0` |
| `fs-5 mb-4` | `tw:text-[1.25rem] tw:mb-6` (a bracketed size, because `text-xl` would also change line-height) |
| `lead mb-4` / `lead mb-2` | `lead tw:mb-6` / `lead tw:mb-2` |
| `img-fluid` (HomeView card images) | `tw:max-w-full tw:h-auto` |
| `img-fluid rounded mx-auto d-block` (HomeView headshot) | `tw:max-w-full tw:h-auto tw:rounded-md tw:mx-auto tw:block` |
| `img-fluid rounded` (ProjectCard) | `tw:max-w-full tw:rounded-md` (**no** `h-auto`, because `.projectContainer img { height: 100% }` must win) |
| `img-fluid ulShadow mx-auto d-block` (modal) | `ulShadow tw:mx-auto tw:block` (**no** `max-w-full`, because `.modal-body img { max-width: 80% }` must win) |
| `col-lg-12 mx-auto` (not inside a `.row`) | `tw:mx-auto tw:lg:w-full` |
| `col-lg-6 mx-auto` (not inside a `.row`) | `tw:mx-auto tw:lg:w-1/2` |
| `col-lg-6 mx-auto position-absolute bottom-20 start-50 translate-middle-x` | `tw:mx-auto tw:absolute tw:bottom-[20%] tw:left-1/2 tw:-translate-x-1/2 tw:lg:w-1/2` |
| `row py-lg-5` | `tw:flex tw:flex-wrap tw:-mx-3 tw:lg:py-12` |
| `row py-0` | `tw:flex tw:flex-wrap tw:-mx-3 tw:py-0` |
| `row pt-5 pb-3` | `tw:flex tw:flex-wrap tw:-mx-3 tw:pt-12 tw:pb-4` |
| `row` (SiteFooter) | `tw:flex tw:flex-wrap tw:-mx-3` |
| `col-lg-8 col-md-10 mx-auto` | `tw:w-full tw:shrink-0 tw:px-3 tw:mx-auto tw:md:w-10/12 tw:lg:w-8/12` |
| `col-lg-6 col-md-8 mx-auto whiteBox` | `whiteBox tw:w-full tw:shrink-0 tw:px-3 tw:mx-auto tw:md:w-8/12 tw:lg:w-6/12` |
| `col-lg-12 col-md-12 mx-auto text-center` | `tw:w-full tw:shrink-0 tw:px-3 tw:mx-auto tw:text-center` |
| `col-lg-12 col-md-12 mx-auto` | `tw:w-full tw:shrink-0 tw:px-3 tw:mx-auto` |
| `col-md-8` (SiteFooter) | `tw:w-full tw:shrink-0 tw:px-3 tw:md:w-8/12` |
| `col-md-4 text-end` (SiteFooter) | `tw:w-full tw:shrink-0 tw:px-3 tw:md:w-4/12 tw:text-end` |
| `row g-5` (ProjectDetailLayout) | `tw:grid tw:grid-cols-1 tw:md:grid-cols-12 tw:gap-12` |
| `col-md-4` (ProjectDetailLayout) | `tw:md:col-span-4` |
| `col-md-8` (ProjectDetailLayout) | `tw:md:col-span-8` |
| `row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-dark` | `tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-4 tw:text-dark` |
| `row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 text-dark` | `tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4 tw:text-dark` |
| `row g-4 py-5 row-cols-1 row-cols-lg-3` | `tw:grid tw:grid-cols-1 tw:lg:grid-cols-3 tw:gap-6 tw:py-12` |
| `row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-2` | `tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-6 tw:py-2` |
| `row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 g-4 py-4` | `tw:grid tw:grid-cols-1 tw:gap-6 tw:py-6` |
| `row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-4 py-5` | `tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-4 tw:gap-6 tw:py-12` |
| `album py-5` | `album tw:py-12` |
| `pb-2 border-bottom` | `tw:pb-2 tw:border-b tw:border-bs-border` |
| `py-5` | `tw:py-12` |
| `list-unstyled` | `tw:list-none tw:pl-0` |
| `text-muted list-unstyled mx-5` | `tw:text-muted tw:list-none tw:pl-0 tw:mx-12` |
| `text-muted mx-5` | `tw:text-muted tw:mx-12` |
| `display-5 fw-bold text-white` | `display-5 tw:font-bold tw:text-white` |
| `d-grid gap-2 d-sm-flex justify-content-sm-center` | `tw:grid tw:gap-2 tw:sm:flex tw:sm:justify-center` |
| `btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold` | `btn btn-outline-info btn-lg tw:px-6 tw:sm:me-4 tw:font-bold` |
| `btn btn-outline-info btn-sm px-4 me-sm-3 fw-bold` | `btn btn-outline-info btn-sm tw:px-6 tw:sm:me-4 tw:font-bold` |
| `btn btn-outline-light btn-lg px-4` | `btn btn-outline-light btn-lg tw:px-6` |
| `card shadow-sm` | `card tw:shadow-bs-sm` |
| `text-white small` | `tw:text-white small` |
| `intro mt-5` / `details mt-1` | `intro tw:mt-12` / `details tw:mt-1` |
| `footer py-3 bg-dark border-top` | `footer tw:py-4 tw:bg-dark tw:border-t tw:border-bs-border` |
| `navbar navbar-expand-lg navbar-dark bg-dark sticky-top` | `navbar navbar-expand-lg navbar-dark tw:bg-dark tw:sticky tw:top-0 tw:z-[1020]` |
| `wrapperSection section-spotlight text-secondary px-4 text-center` | `wrapperSection section-spotlight tw:text-secondary tw:px-6 tw:text-center` |
| `wrapperSection section-lightbulb text-secondary px-4 text-center position-relative` (also `section-computer`) | `wrapperSection section-lightbulb tw:text-secondary tw:px-6 tw:text-center tw:relative` |
| `wrapperSection section-orange position-relative text-white px-4 text-center` | `wrapperSection section-orange tw:relative tw:text-white tw:px-6 tw:text-center` |
| `wrapperSection section-light position-relative text-dark px-4` | `wrapperSection section-light tw:relative tw:text-dark tw:px-6` |
| `wrapperSection section-grey position-relative text-dark px-4 pb-0` | `wrapperSection section-grey tw:relative tw:text-dark tw:px-6 tw:pb-0` |
| `wrapperSection py-0 pb-5 section-<x> position-relative text-secondary px-4` (`<x>` is light, white, grey or lightgrey) | `wrapperSection section-<x> tw:pt-0 tw:pb-12 tw:relative tw:text-secondary tw:px-6` |
| `section-lightgrey position-relative text-dark px-4 pb-5` | `section-lightgrey tw:relative tw:text-dark tw:px-6 tw:pb-12` |
| `section-dark position-relative text-light px-4 pb-5` | `section-dark tw:relative tw:text-light tw:px-6 tw:pb-12` |

**Keep unchanged:**
- Every `fa`, `fa-*` and `small` class on icons.
- `btn btn-info`, `card-body`, `card-text`, `h4 projectTitle`, `title`, `projectContainer`, `overlay`, `blog-post`, `blog-post-title`, `container-fluid`.
- Every `navbar-*`, `nav-*`, `dropdown-*` and `modal-*` class, and `btn-close`.

### 2.4 Why the grid translations are exact

Bootstrap's `.row` uses negative margins and column padding. With `gap-*`, CSS grid produces the same content widths and the same outer edges; I checked the arithmetic for `g-3`, `g-4` and `g-5`. Tailwind's `grid-cols-N` is `repeat(N, minmax(0, 1fr))`, so long content can't widen a column.

A `.row` with **no** `g-*` class uses the default 1.5rem gutter. That's why those rows become `tw:flex tw:flex-wrap tw:-mx-3` with children `tw:w-full tw:shrink-0 tw:px-3 …`.

A `col-*` class whose parent is **not** a `.row` only sets a width at its breakpoint, with no padding.

### 2.5 Class names that stay after the migration

These class names remain in templates. In PR 6 their CSS comes from the extracted Bootstrap files or from `site.css`:

- **Bootstrap components:**
  - buttons: `btn`, `btn-lg`, `btn-sm`, `btn-info`, `btn-outline-info`, `btn-outline-light`, `btn-close`
  - card: `card`, `card-body`, `card-text`
  - navbar: `navbar`, `navbar-expand-lg`, `navbar-dark`, `navbar-brand`, `navbar-toggler`, `navbar-toggler-icon`, `navbar-collapse`, `navbar-nav`, `nav-item`, `nav-link`, `active`
  - dropdowns: `dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-item`, `dropdown-divider`, `dropdown-header`
  - modal: `modal`, `modal-dialog`, `modal-xl`, `modal-dialog-centered`, `modal-content`, `modal-header`, `modal-title`, `modal-body`, `modal-backdrop`, `show`
  - other: `container-fluid`, `lead`, `display-5`, `small`, `h4`
- **Custom (`site.css`):**
  - page structure: `wrapperSection`, `title`, `whiteBox`, `ulShadow`, `bs-container`, `nav-menu-root`
  - project cards: `projectContainer`, `overlay`, `projectTitle`, `hasMore`
  - section backgrounds: `section-spotlight`, `section-lightbulb`, `section-computer`, `section-orange`, `section-light`, `section-grey`, `section-lightgrey`, `section-dark`, `section-white`
- **Hooks with no styles:** `footer`, `album`, `blog-post`, `blog-post-title`, `intro`, `details`.
- **Font Awesome:** `fa`, `fa-*`.

### 2.6 Tailwind theme values

These are copied from the compiled Bootstrap 5.3.8 CSS in `node_modules/bootstrap/dist/css/bootstrap.css`.

```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1400px;

  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans',
    'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';

  --color-dark: #212529;
  --color-light: #f8f9fa;
  --color-secondary: #6c757d; /* Bootstrap .text-secondary */
  --color-muted: rgb(33 37 41 / 0.75); /* Bootstrap 5.3 .text-muted */
  --color-bs-border: #dee2e6;

  --shadow-bs-sm: 0 0.125rem 0.25rem rgb(0 0 0 / 0.075);
  --shadow-bs-lg: 0 1rem 3rem rgb(0 0 0 / 0.175);
}
```

Tailwind's defaults already match Bootstrap's corner radius (`rounded-md` is 0.375rem and `rounded-lg` is 0.5rem) and white (`#fff`).

### 2.7 Known differences you should not "fix"

- **The mobile menu opens instantly**, without Bootstrap's 0.35s height animation.
- **Dropdown toggles become `<button>`s without an `href`.** Bootstrap blocked those links from navigating anyway.
- **Hash-only anchors stay plain `<a>` tags**: `href="#significantProjects"` and `href="#contact"` in HomeView.

---

## 3. PR 1: Screenshot tests and cleanup (no visual change)

**Title:** `Add visual regression tests and remove unused components`

### 3.1 Dependencies and scripts

```sh
npm i -D -E @playwright/test@1.63.0
```

The version must exactly match the CI image tag in 3.5. In `package.json` `scripts`, add:

```json
"test:visual": "playwright test",
"test:visual:compare": "bash scripts/visual-compare.sh"
```

### 3.2 `playwright.config.js` (new file, repo root)

```js
import { defineConfig } from '@playwright/test'

// Screenshots are compared against a baseline captured from another build in the same run
// (see scripts/visual-compare.sh). VISUAL_DIST_DIR selects which build is served.
const distDir = process.env.VISUAL_DIST_DIR || 'dist'

export default defineConfig({
  testDir: './e2e',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.001,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: `npx vite preview --outDir "${distDir}" --host 127.0.0.1 --port 4173 --strictPort`,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
```

### 3.3 `e2e/visual.spec.js` (new file)

The selectors use only text, `aria-label`s, heading roles and existing `id`s. That way they work against both the Bootstrap build and the Reka build. Don't use Bootstrap or Reka class names here.

```js
import { expect, test } from '@playwright/test'

const routes = [
  ['home', '/'],
  ['appraisals', '/appraisals'],
  ['rulesengine', '/rulesengine'],
  ['webapps', '/webapps'],
  ['randomforest', '/randomforest'],
  ['validations', '/validations'],
  ['itsystems', '/itsystems'],
  ['rebuild', '/rebuild'],
  ['annualreports', '/annualreports'],
]

const viewports = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 800, height: 1000 },
  desktop: { width: 1280, height: 900 },
}

// Load lazy images and wait for every image and web font so screenshots are deterministic.
async function settle(page) {
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager'
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true })
              img.addEventListener('error', resolve, { once: true })
            }),
      ),
    )
    await document.fonts.ready
  })
}

for (const [viewportName, viewport] of Object.entries(viewports)) {
  test.describe(`${viewportName} pages`, () => {
    test.use({ viewport })

    for (const [name, path] of routes) {
      test(name, async ({ page }) => {
        await page.goto(path)
        await settle(page)
        await expect(page).toHaveScreenshot(`${name}-${viewportName}.png`, { fullPage: true })
      })
    }
  })
}

test.describe('interactive states', () => {
  test('desktop dropdown opens on hover', async ({ page }) => {
    await page.setViewportSize(viewports.desktop)
    await page.goto('/')
    await settle(page)
    await page.locator('nav').getByText('Portfolio', { exact: true }).hover()
    await expect(page.locator('nav').getByText('Random Forest', { exact: true })).toBeVisible()
    await expect(page).toHaveScreenshot('nav-dropdown-hover-desktop.png')
  })

  test('mobile menu and submenu open', async ({ page }) => {
    await page.setViewportSize(viewports.mobile)
    await page.goto('/')
    await settle(page)
    await page.getByRole('button', { name: 'Toggle navigation' }).click()
    await expect(page.locator('nav').getByText('Home', { exact: true })).toBeVisible()
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('nav-menu-open-mobile.png')
    await page.locator('nav').getByText('Portfolio', { exact: true }).click()
    await expect(page.locator('nav').getByText('Random Forest', { exact: true })).toBeVisible()
    await expect(page).toHaveScreenshot('nav-submenu-open-mobile.png')
  })

  for (const viewportName of ['mobile', 'desktop']) {
    test(`project modal (${viewportName})`, async ({ page }) => {
      await page.setViewportSize(viewports[viewportName])
      await page.goto('/webapps')
      await settle(page)
      await page.locator('#internalRebuild').click()
      await expect(
        page.getByRole('heading', { level: 3, name: 'Internal Website Rebuild' }),
      ).toBeVisible()
      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot(`project-modal-${viewportName}.png`)
    })
  }

  test('project card hover', async ({ page }) => {
    await page.setViewportSize(viewports.desktop)
    await page.goto('/webapps')
    await settle(page)
    const card = page.locator('#checkout')
    await card.hover()
    await expect(card).toHaveScreenshot('project-card-hover-desktop.png')
  })
})
```

### 3.4 `scripts/visual-compare.sh` (new file)

```bash
#!/usr/bin/env bash
# Captures baseline screenshots from a base git ref's build, then compares the current
# checkout's build against them. Both captures run on this machine, so fonts and
# rendering match. Usage: npm run test:visual:compare -- [base-ref]  (default: origin/main)
set -euo pipefail

BASE_REF="${1:-origin/main}"
ROOT="$(git rev-parse --show-toplevel)"
BASE_DIR="$(mktemp -d)"

cleanup() {
  git -C "$ROOT" worktree remove --force "$BASE_DIR" >/dev/null 2>&1 || true
}
trap cleanup EXIT

cd "$ROOT"
git worktree add --detach "$BASE_DIR" "$BASE_REF"
(cd "$BASE_DIR" && npm ci --no-audit --no-fund && npm run build)

rm -rf e2e/__screenshots__
VISUAL_DIST_DIR="$BASE_DIR/dist" npx playwright test --update-snapshots=all --reporter=list

npm run build
VISUAL_DIST_DIR="$ROOT/dist" npx playwright test
```

Make the script executable with `chmod +x scripts/visual-compare.sh` and commit the mode change.

### 3.5 CI (`.github/workflows/deploy.yml`)

1. Change the `pull_request` trigger so adding a label re-runs the checks:
   ```yaml
   pull_request:
     branches:
       - main
     types: [opened, synchronize, reopened, labeled, unlabeled]
   ```
2. Add this job between `build-and-test` and `deploy`. Leave `deploy`'s `needs: build-and-test` as is.
   ```yaml
   visual:
     name: Visual regression
     if: github.event_name == 'pull_request'
     runs-on: ubuntu-latest
     container:
       image: mcr.microsoft.com/playwright:v1.63.0-noble
     # A maintainer adds this label after reviewing an intentional visual change.
     continue-on-error: ${{ contains(github.event.pull_request.labels.*.name, 'visual-change-approved') }}

     steps:
       - name: Checkout repository
         uses: actions/checkout@v4
         with:
           fetch-depth: 0

       - name: Setup Node.js
         uses: actions/setup-node@v4
         with:
           node-version: 20
           cache: npm

       - name: Trust workspace
         run: git config --global --add safe.directory "$GITHUB_WORKSPACE"

       - name: Install dependencies
         run: npm ci

       - name: Compare screenshots with the base branch
         run: npm run test:visual:compare -- "origin/${{ github.base_ref }}"

       - name: Upload report
         if: failure()
         uses: actions/upload-artifact@v4
         with:
           name: playwright-report
           path: playwright-report/
           retention-days: 14
   ```
3. In the PR description, ask the owner to create a repository label named `visual-change-approved`. It's needed in PR 7.

### 3.6 Lint and ignore settings

- `.gitignore`: add `/playwright-report/` and `/test-results/`. `e2e/__screenshots__` is already covered by `__screenshots__/`.
- `eslint.config.js`: add `'**/playwright-report/**'` and `'**/test-results/**'` to `globalIgnores([...])`. Then add this block after the `languageOptions` block:
  ```js
  {
    name: 'app/node-files',
    files: ['playwright.config.js', 'e2e/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ```
- If `npm run lint:check:oxlint` reports `process` as undefined, add this to `.oxlintrc.json`:
  ```json
  "overrides": [{ "files": ["playwright.config.js", "e2e/**"], "env": { "node": true } }]
  ```

### 3.7 Make tests independent of Bootstrap class names

- **`src/components/ProjectDetailLayout/ProjectDetailLayout.vue`:** add test ids only.
  - `data-testid="project-subtitle"` on the `<div class="col-lg-6 mx-auto">`
  - `data-testid="project-intro"` on `<div class="px-4 pt-5 mb-5 border-bottom">`
  - `data-testid="project-sidebar"` on `<div class="col-md-4">`
- **`ProjectDetailLayout.spec.js`:** change the three selectors to `[data-testid="project-subtitle"] p`, `[data-testid="project-intro"] p` and `[data-testid="project-sidebar"] h2`.
- **`SiteFooter.spec.js`:** change `footer.footer` to `footer`. Keep the `'Bootstrap'` text assertion until PR 7.

### 3.8 Remove unused files

- Delete:
  - `src/components/icons/` (all 5 files)
  - `src/components/UnderDevelopment/` (the component and its spec)
  - `src/assets/images/under-development.png`
- In `src/assets/css/site.css`, delete the `.blue`, `.blue.textBorder`, `.mainWrapper` and `.projectImg` rules.
- Before deleting, check each file is unused: `grep -rn "icons/\|UnderDevelopment\|under-development" src` must only show the files being deleted.

### 3.9 Docs

- **`docs/architecture.md`:**
  - Remove "`src/components/icons/` holds static icons."
  - Add a row: `e2e/`, `playwright.config.js` and `scripts/visual-compare.sh` hold the Playwright screenshot tests. They compare the current build against the base branch's build.
  - Mention the new CI job in the `deploy.yml` row.
- **`docs/workflow.md`:** in step 4, add `npm run test:visual:compare -- origin/main` for any change to templates, CSS or assets. Explain that it builds the base ref in a temporary git worktree and must report zero failures unless the change is meant to look different. For the cloud container, note `PW_CHROMIUM_PATH=/opt/pw-browsers/chromium`.
- **`README.md`:** add a "Visual regression tests" command section.

### 3.10 Done when

- The checks in 0.5 pass.
- The compare script reports **35 passed**: 27 page screenshots and 8 interactive-state screenshots.
- The CI **Visual regression** job is green on the PR.

---

## 4. PR 2: Replace Bootstrap's JavaScript with Reka UI, and use `RouterLink` (no visual change)

**Title:** `Replace Bootstrap JavaScript with Reka UI and use RouterLink`

```sh
npm i reka-ui@^2.10.5
```

### 4.1 Test router helper: `src/test-utils/router.js` (new file)

```js
import { createMemoryHistory, createRouter } from 'vue-router'

// Resolves every path so RouterLink renders real hrefs in component tests.
export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
  })
}
```

### 4.2 Router scroll behavior (`src/router/index.js`)

In-app navigation no longer reloads the page, so add this to `createRouter({...})`:

```js
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash }
  return { top: 0 }
},
```

Add `src/router/index.spec.js`, which calls `router.options.scrollBehavior` directly:
- A saved position `{ left: 0, top: 120 }` is returned unchanged.
- `{ hash: '#contact' }` returns `{ el: '#contact' }`.
- Anything else returns `{ top: 0 }`.

### 4.3 `src/components/NavBar/NavBar.vue` (replace the whole file)

```vue
<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from 'reka-ui'

const route = useRoute()
const menuOpen = ref(false)
const openMenu = ref('')

// In-app navigation no longer reloads the page, so close the menus after it.
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    openMenu.value = ''
  },
)
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <CollapsibleRoot v-model:open="menuOpen" class="container-fluid">
      <a class="navbar-brand">Matthew Scanland</a>
      <CollapsibleTrigger
        class="navbar-toggler"
        aria-controls="navbarNavDropdown"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </CollapsibleTrigger>
      <CollapsibleContent
        id="navbarNavDropdown"
        force-mount
        class="collapse navbar-collapse"
        :class="{ show: menuOpen }"
      >
        <!-- Wide-screen hover opening stays in site.css; Reka handles click, keyboard, and dismissal. -->
        <NavigationMenuRoot
          v-model="openMenu"
          as="div"
          class="nav-menu-root"
          disable-hover-trigger
          disable-pointer-leave-close
        >
          <NavigationMenuList class="navbar-nav">
            <NavigationMenuItem class="nav-item">
              <NavigationMenuLink as-child>
                <RouterLink class="nav-link active" to="/">Home</RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value="resume" class="nav-item dropdown">
              <NavigationMenuTrigger
                class="nav-link dropdown-toggle"
                :class="{ show: openMenu === 'resume' }"
              >
                Resume
              </NavigationMenuTrigger>
              <NavigationMenuContent
                force-mount
                class="dropdown-menu"
                :class="{ show: openMenu === 'resume' }"
              >
                <NavigationMenuLink class="dropdown-item" href="/files/Scanland-Matthew_Resume.pdf">
                  Resume (pdf)
                </NavigationMenuLink>
                <NavigationMenuLink class="dropdown-item" href="/files/Scanland-Matthew_Resume.docx">
                  Resume (docx)
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <!-- "portfolio", "guides", "contact": same pattern as "resume"; items listed below. -->
          </NavigationMenuList>
        </NavigationMenuRoot>
      </CollapsibleContent>
    </CollapsibleRoot>
  </nav>
</template>
```

Write out the remaining three `NavigationMenuItem`s in full, using the same pattern and the current link text in the current order:

- **`value="portfolio"`, trigger text `Portfolio`:**
  - `RouterLink`s to `/appraisals` (Digital Appraisals Platform) and `/rulesengine` (Rules Engine / Self Service)
  - `<div class="dropdown-divider"></div>`
  - `<h6 class="dropdown-header">Earlier Work</h6>`
  - `RouterLink`s to `/rebuild` (Internal Website Rebuild), `/randomforest` (Random Forest), `/validations` (Lab Validations), `/webapps` (Other Web Apps) and `/itsystems` (IT Systems)
  - an `href` link to `https://github.com/mkscanland` (GitHub)

  Each `RouterLink` is wrapped as `<NavigationMenuLink as-child><RouterLink class="dropdown-item" to="…">…</RouterLink></NavigationMenuLink>`.
- **`value="guides"`, trigger text `Guides`:** `href="/files/Azure-Data-Lake-Plan_Public Copy.pdf"` (Azure Data Lake Creation).
- **`value="contact"`, trigger text `Contact`:** `https://www.linkedin.com/in/matthew-scanland/` (LinkedIn) and `mailto:mkscanland@gmail.com` (Email).

Why it's built this way: I checked these details against the reka-ui 2.10.5 source.
- `force-mount` keeps closed menus in the page, so links stay crawlable and `NavBar.spec.js` still finds them.
- Visibility comes from Bootstrap's own `.show` rules, bound from Reka's state. Reka's `data-state` attribute isn't reliable on first render.
- Hover is disabled in Reka because the existing CSS hover rule reproduces today's behavior exactly: hover opens only at 900px and up, and clicking toggles.

### 4.4 `site.css` additions (append these)

```css
/* Reka keeps closed menus mounted with pointer-events: none; the hover rule above still shows them. */
.navbar .dropdown-menu {
  pointer-events: auto !important;
}

/* Reka's menu root and list wrapper must not add boxes inside the Bootstrap navbar layout. */
.nav-menu-root,
.nav-menu-root > div {
  display: contents;
}

/* Project modal enter/exit, matching Bootstrap's .fade (0.15s) and dialog slide (0.3s). */
.modal[data-state='open'] {
  animation: modal-fade-in 0.15s linear;
}
.modal[data-state='open'] .modal-dialog {
  animation: modal-slide-in 0.3s ease-out;
}
.modal[data-state='closed'] {
  animation: modal-fade-out 0.15s linear;
}
.modal-backdrop[data-state='open'] {
  animation: backdrop-fade-in 0.15s linear;
}
.modal-backdrop[data-state='closed'] {
  animation: backdrop-fade-out 0.15s linear;
}
@keyframes modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modal-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes modal-slide-in {
  from { transform: translate(0, -50px); }
  to { transform: none; }
}
@keyframes backdrop-fade-in {
  from { opacity: 0; }
  to { opacity: 0.5; }
}
@keyframes backdrop-fade-out {
  from { opacity: 0.5; }
  to { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .modal,
  .modal .modal-dialog,
  .modal-backdrop {
    animation: none !important;
  }
}
```

Format the keyframes one declaration per line, like the rest of `site.css`.

### 4.5 `src/views/WebApplications/WebApplications.vue`

- **Script:**
  - Import `DialogClose`, `DialogContent`, `DialogDescription`, `DialogOverlay`, `DialogPortal`, `DialogRoot` and `DialogTitle` from `reka-ui`.
  - Add `const modalOpen = ref(false)`.
  - `selectProject(project)` now sets `selectedProject.value = project` and then `modalOpen.value = true`.
  - Add this function:
    ```js
    // Match Bootstrap: focus the dialog container, not the close button (which would show a focus ring).
    function focusModal(event) {
      event.preventDefault()
      document.getElementById('infoModal')?.focus()
    }
    ```
- **Template:** remove `data-bs-toggle="modal"` and `data-bs-target="#infoModal"` from both `ProjectCard` usages. Replace the whole `<div class="modal fade" id="infoModal" …>…</div>` block with:
  ```vue
  <DialogRoot v-model:open="modalOpen">
    <DialogPortal>
      <DialogOverlay class="modal-backdrop show" />
      <DialogContent
        id="infoModal"
        class="modal show"
        style="display: block"
        aria-labelledby="infoModalTitle"
        aria-describedby="infoModalDescription"
        @open-auto-focus="focusModal"
        @click.self="modalOpen = false"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <DialogTitle id="infoModalTitle" as="h3" class="modal-title">
                {{ selectedProject?.title }}
              </DialogTitle>
              <DialogClose class="btn-close" aria-label="Close" />
            </div>
            <div class="modal-body" id="infoModalBody">
              <img
                v-if="selectedProject"
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="img-fluid ulShadow mx-auto d-block"
              />
              <DialogDescription id="infoModalDescription" class="intro mt-5">
                {{ selectedProject?.intro || selectedProject?.description }}
              </DialogDescription>
              <b>Details:</b>
              <p class="details mt-1">{{ selectedProject?.details }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
  ```

`@click.self` closes the modal when the backdrop area is clicked. In Bootstrap's layout the full-screen `.modal` element sits outside `.modal-content`, and `.modal-dialog` has `pointer-events: none`, so those clicks land on `.modal` itself.

### 4.6 Convert these links to `RouterLink` (keep the same classes and text)

| File | Line (before) | `to` |
|---|---|---|
| `HomeView.vue` | 8 | `/#contact` |
| `HomeView.vue` | 48, 62, 100 | `/rulesengine` (line 100 keeps `class="btn btn-info"`) |
| `HomeView.vue` | 64, 88 | `/appraisals` (line 88 keeps `class="btn btn-info"`) |
| `HomeView.vue` | 111 | `/webapps` (keeps `class="btn btn-info"`) |
| `WebApplications.vue` | 124 | `/#contact` |
| `ITSystems.vue` | 22 | `/#contact` |
| `ITSystems.vue` | 74 | `/rebuild` |
| `InternalRebuild.vue` | 150 | `/webapps` |

Leave these as plain `<a>`:
- HomeView lines 11 (`#significantProjects`) and 65 (`#contact`)
- all `/files/…`, `mailto:` and external links

Import `RouterLink` from `vue-router` in each file that needs it, following `DigitalAppraisals.vue`, which uses it as a global component. If ESLint doesn't complain, a global component needs no import.

### 4.7 `src/main.js`

Delete the line `import 'bootstrap'`. Keep the CSS imports.

### 4.8 Tests

- **Router plugin:** mount with `global: { plugins: [createTestRouter()] }` in:
  - `NavBar.spec.js`
  - `HomeView.spec.js`
  - `ITSystems.spec.js`
  - `InternalRebuild.spec.js`
  - `WebApplications.spec.js`

  Before mounting, do `await router.push('/')` and `await router.isReady()`. Keep `DigitalAppraisals.spec.js` on its `RouterLinkStub`.
- **`WebApplications.spec.js`:**
  - Also pass `stubs: { teleport: true }`, so the dialog renders inside the component where the tests can see it.
  - After each `trigger(...)`, add `await flushPromises()` (imported from `@vue/test-utils`).
  - Keep every existing assertion.
  - Add `expect(wrapper.get('#infoModal').attributes('aria-labelledby')).toBe('infoModalTitle')`.

  If Reka overrides the custom ids, so that the new assertion fails:
  - remove `id`, `aria-labelledby` and `aria-describedby` from the `DialogContent`, `DialogTitle` and `DialogDescription` elements,
  - change those test selectors to `#infoModal .modal-title` and `#infoModal .modal-body img`,
  - note this in the PR.
- **`NavBar.spec.js`**, add two tests:
  1. Clicking `button[aria-label="Toggle navigation"]` adds class `show` to `#navbarNavDropdown`. After `await router.push('/webapps')` and `await flushPromises()`, the class is removed.
  2. Clicking the button whose text is `Portfolio` adds class `show` to that button.
- **If Vitest fails with `ResizeObserver is not defined`:**
  1. Create `vitest.setup.js` containing:
     ```js
     globalThis.ResizeObserver ??= class {
       observe() {}
       unobserve() {}
       disconnect() {}
     }
     ```
  2. Add `setupFiles: ['./vitest.setup.js']` to `vitest.config.js` under `test`.

### 4.9 Done when

- The checks in 0.5 pass.
- `grep -rn "data-bs-" src` returns nothing.
- There are zero screenshot differences.

---

## 5. PR 3: Add Tailwind with Bootstrap's values (no visual change, no template changes)

**Title:** `Add Tailwind CSS v4 alongside Bootstrap`

```sh
npm i -D tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3
```

1. **`vite.config.js`:** add `import tailwindcss from '@tailwindcss/vite'`, then set `plugins: [vue(), tailwindcss(), vueDevTools()]`.
2. **Create `src/assets/css/main.css`.** I checked this exact structure with Tailwind 4.3.3.
   ```css
   /* Layer order: Tailwind theme variables, then Bootstrap + site styles, then Tailwind utilities.
      Utilities always win over non-!important Bootstrap/site rules. The tw: prefix avoids
      class-name collisions while Bootstrap is still loaded. */
   @layer theme, legacy, utilities;
   @import 'tailwindcss/theme.css' layer(theme) prefix(tw);
   @import './site.css' layer(legacy);
   @import 'bootstrap/dist/css/bootstrap.min.css' layer(legacy);
   @import 'tailwindcss/utilities.css' layer(utilities);
   ```
   After the imports, add the `@theme { … }` block from section 2.6 exactly. Don't import Tailwind's base reset (`preflight.css`). Bootstrap's reset stays in charge.
3. **`src/main.js`:** the first two lines become one, `import './assets/css/main.css'`. Keep the Font Awesome import after it, unlayered as today.
4. **`.vscode/extensions.json`:** add `"bradlc.vscode-tailwindcss"` to `recommendations`.
5. **Check the prefix works**, without committing the check:
   1. Create `src/tw-smoke.txt` containing `tw:hidden tw:md:w-10/12`.
   2. Run `npm run build`.
   3. Run `grep -c 'tw\\:hidden' dist/assets/*.css`. It must print at least 1.
   4. Delete `src/tw-smoke.txt`.
6. **`docs/conventions.md`:** replace the "Reuse the existing Bootstrap utilities…" bullet with a **Styling** section:
   - During the migration, new utilities use the `tw:` prefix.
   - Include the spacing table from 2.2.
   - Include the gotchas: no `@apply`; don't combine `py-*` with `pt-*`/`pb-*`; use `tw:text-[…]` rather than `text-xl` and similar to keep line-height.
   - Include the retained class list from 2.5.
7. **`docs/architecture.md`:** update the styles row. `main.css` owns layer order, the Tailwind theme, `site.css` and Bootstrap. Font Awesome is still imported in `main.js`.

**Done when:** the checks in 0.5 pass and there are zero screenshot differences.

---

## 6. PR 4: Section classes, shared components and navbar (no visual change)

**Title:** `Move shared layout components to Tailwind`

Make one commit per numbered step below, and run the compare script after each one.

### 6.1 Rename the section background classes

This makes `site.css` stop depending on Bootstrap's `bg-*` classes.

**In `site.css`:**
1. Delete these rules:
   - `.bg-lightGrey` and `.bg-orange`
   - all seven `.wrapperSection.bg-*` rules
   - all five `.bg-* .title` rules
2. Add the rules below. The values are the backgrounds that actually render today.

```css
/* Section backgrounds (formerly bg-* classes; effective colors preserved, including
   Bootstrap's !important .bg-light #f8f9fa on sections). */
.section-spotlight {
  background: url('@/assets/images/banner.jpg') center center / cover;
}
.section-lightbulb {
  background: url('@/assets/images/lightbulb-bg.jpg') center center / cover;
}
.section-computer {
  background: url('@/assets/images/computer-bg.jpg') center center / cover;
}
.section-orange {
  background: #e97770 url('@/assets/images/overlay.png');
}
.section-light {
  background: #f8f9fa url('@/assets/images/overlay.png');
}
.section-grey {
  background: #f3f3f3 url('@/assets/images/overlay.png');
}
.section-lightgrey {
  background: #e9ecef url('@/assets/images/overlay.png');
}
.section-dark {
  background-color: #212529;
}
.section-white {
  background-color: #fff;
}

.section-orange .title {
  background: #e97770 url('@/assets/images/overlay.png');
  color: #fff;
}
.section-dark .title {
  background: #212529 url('@/assets/images/overlay.png');
  color: #fff;
}
.section-light .title {
  background: #f8f9fa url('@/assets/images/overlay.png');
  color: #000;
}
.section-grey .title {
  background: #f3f3f3 url('@/assets/images/overlay.png');
  color: #000;
}
.section-lightgrey .title {
  background: #e9ecef url('@/assets/images/overlay.png');
  color: #000;
}

/* Bootstrap 5.3 .container, renamed because Tailwind's `container` utility uses different widths. */
.bs-container {
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .bs-container { max-width: 540px; }
}
@media (min-width: 768px) {
  .bs-container { max-width: 720px; }
}
@media (min-width: 992px) {
  .bs-container { max-width: 960px; }
}
@media (min-width: 1200px) {
  .bs-container { max-width: 1140px; }
}
@media (min-width: 1400px) {
  .bs-container { max-width: 1320px; }
}
```

`section-white` intentionally has no `.title` rule, matching today: the ribbon in WebApplications' "Key Current Projects" has no background.

**In templates,** change only the `bg-*` token on these 15 elements:

| File:line | Old token | New token |
|---|---|---|
| `ProjectDetailLayout.vue:11` | `bg-spotlight` | `section-spotlight` |
| `ProjectDetailLayout.vue:19` | `bg-light` | `section-light` |
| `HomeView.vue:2` | `bg-spotlight` | `section-spotlight` |
| `HomeView.vue:18` | `bg-orange` | `section-orange` |
| `HomeView.vue:34` | `bg-light` | `section-light` |
| `HomeView.vue:72` | `bg-grey` | `section-grey` |
| `HomeView.vue:119` | `bg-lightGrey` | `section-lightgrey` |
| `HomeView.vue:176` | `bg-dark` | `section-dark` |
| `HomeView.vue:346` | `bg-grey` | `section-grey` |
| `WebApplications.vue:18` | `bg-lightbulb` | `section-lightbulb` |
| `WebApplications.vue:25` | `bg-white` | `section-white` |
| `WebApplications.vue:81` | `bg-lightGrey` | `section-lightgrey` |
| `WebApplications.vue:118` | `bg-grey` | `section-grey` |
| `ITSystems.vue:9` | `bg-computer` | `section-computer` |
| `ITSystems.vue:16` | `bg-lightGrey` | `section-lightgrey` |

Line numbers are from `main` before PR 2. Match on the full class string if they've shifted. Don't touch the `bg-light` class on the `p-4 … bg-light rounded` sidebar boxes, or the `bg-dark` class on the navbar and footer.

### 6.2 Convert `SiteFooter.vue`

Apply the table in 2.3 (rows for `footer py-3 bg-dark border-top`, `row`, `col-md-8` and `col-md-4 text-end` in SiteFooter, and `text-white small`). Keep `container-fluid`.

### 6.3 Convert `ProjectCard.vue`

Change only the `img` class to `tw:max-w-full tw:rounded-md`.

### 6.4 Convert `ProjectDetailLayout.vue`

The target markup:

```vue
<template>
  <div class="wrapperSection section-spotlight tw:text-secondary tw:px-6 tw:text-center">
    <div class="tw:py-12">
      <h1 class="display-5 tw:font-bold tw:text-white">{{ title }}</h1>
      <div class="tw:mx-auto tw:lg:w-1/2" data-testid="project-subtitle">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
  <div class="wrapperSection section-light tw:pt-0 tw:pb-12 tw:relative tw:text-secondary tw:px-6">
    <div class="title">Main Information</div>
    <div
      class="tw:px-6 tw:pt-12 tw:mb-12 tw:border-b tw:border-bs-border"
      data-testid="project-intro"
    >
      <slot name="intro" />
    </div>
    <div class="tw:grid tw:grid-cols-1 tw:md:grid-cols-12 tw:gap-12">
      <div class="tw:md:col-span-4" data-testid="project-sidebar">
        <slot name="sidebar" />
      </div>
      <div class="tw:md:col-span-8">
        <article class="blog-post">
          <slot />
        </article>
      </div>
    </div>
  </div>
</template>
```

### 6.5 Convert `NavBar.vue`

- The `<nav>` class becomes `navbar navbar-expand-lg navbar-dark tw:bg-dark tw:sticky tw:top-0 tw:z-[1020]`.
- On `CollapsibleContent`, change `class="collapse navbar-collapse"` to `class="navbar-collapse"`. Tailwind has its own `collapse` utility, which would clash after PR 6.
- Append this to `site.css`:
  ```css
  /* Replaces Bootstrap's .collapse:not(.show); .navbar-expand-lg keeps it visible on wide screens. */
  .navbar-collapse:not(.show) {
    display: none;
  }
  ```

**Done when:** the checks in 0.5 pass, with zero screenshot differences after every step.

---

## 7. PR 5: Convert the page views (no visual change)

**Title:** `Move page views to Tailwind utilities`

Make one commit per file, in this order, and run the compare script after each:
1. `DigitalAppraisals.vue`
2. `RulesEngine.vue`
3. `RandomForest.vue`
4. `LabValidations.vue`
5. `AnnualReports.vue`
6. `InternalRebuild.vue`
7. `ITSystems.vue`
8. `WebApplications.vue`
9. `HomeView.vue`

- Apply section 2.3 to every `class="..."` in each file. Every string in these files is listed there.
- Keep inline `style="max-height: …"` attributes.
- After the last file, delete the `.bottom-20` rule from `site.css`. It no longer matches anything.
- Run the class checker from Appendix A. It must print nothing and exit with code 0.

**Done when:** the checks in 0.5 pass, there are zero screenshot differences, and the class checker is clean.

---

## 8. PR 6: Remove Bootstrap and the `tw:` prefix (no visual change)

**Title:** `Remove Bootstrap and the Tailwind prefix`

1. **Run the class checker** (Appendix A). It must be clean before you start.
2. **Copy Bootstrap's reset file:**
   ```sh
   mkdir -p src/assets/css/vendor
   cp node_modules/bootstrap/dist/css/bootstrap-reboot.css src/assets/css/vendor/bootstrap-reboot.css
   ```
   Then delete its last line, `/*# sourceMappingURL=bootstrap-reboot.css.map */`. Keep the license header.
3. **Extract the component styles:** run the script in Appendix B, then delete the script. It writes `src/assets/css/vendor/bootstrap-subset.css`.
4. **Replace the imports in `src/assets/css/main.css`:**
   ```css
   @layer theme, legacy, utilities;
   @import 'tailwindcss/theme.css' layer(theme);
   @import './site.css' layer(legacy);
   @import './vendor/bootstrap-reboot.css' layer(legacy);
   @import './vendor/bootstrap-subset.css' layer(legacy);
   @import 'tailwindcss/utilities.css' layer(utilities);
   ```
   Keep the `@theme` block. Update the comment at the top. The order `site.css`, then reset, then components matches today's cascade.
5. **Remove the prefix:**
   ```sh
   grep -rlE "tw:" src --include=*.vue --include=*.js | xargs sed -i -E "s/(^|[\"' {\`])tw:/\1/g"
   ```
   Then confirm `grep -rn "tw:" src` prints nothing.
6. **Uninstall Bootstrap:** run `npm uninstall bootstrap`, then confirm `grep -rn "bootstrap" src package.json` shows only the `vendor/` files and comments.
7. **Update the docs:**
   - `docs/conventions.md`: drop the prefix rule and say the migration is complete. Keep the spacing table as the Bootstrap-to-Tailwind reference.
   - `docs/architecture.md`: the styles row now lists `main.css`, `site.css` and `vendor/`, and says Bootstrap is no longer a dependency.
   - `README.md`: mention Tailwind.
8. **In the PR description,** report the CSS bundle size before and after: `ls -l dist/assets/*.css` on `main` and on the branch.

**Done when:** the checks in 0.5 pass, there are zero screenshot differences, and neither `tw:` nor any Bootstrap import remains.

---

## 9. PR 7: Footer text (intentional visual change)

**Title:** `Update footer technology note`

1. In `SiteFooter.vue`, change `This website was built using Vue.js, and Bootstrap.` to `This website was built using Vue.js and Tailwind CSS.` Leave the rest of the sentence and markup unchanged.
2. In `SiteFooter.spec.js`, change `toContain('Bootstrap')` to `toContain('Tailwind CSS')`.
3. The compare script will fail, **only** on footer areas. Check the HTML report in `playwright-report/`: every difference must be inside the footer.
   - In the PR, list the failing screenshots and ask the owner to review the CI artifact and add the `visual-change-approved` label.
   - Any difference outside the footer is a bug. Stop and report it.

---

## Appendix A: Class checker (temporary; don't commit)

Save it as `check-classes.mjs` in your scratch directory and run it from the repo root with `node <path>/check-classes.mjs`. It prints any class that is neither `tw:`-prefixed nor in the allowed list in 2.5.

```js
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const allowed = new Set([
  'btn', 'btn-lg', 'btn-sm', 'btn-info', 'btn-outline-info', 'btn-outline-light', 'btn-close',
  'card', 'card-body', 'card-text', 'container-fluid', 'lead', 'display-5', 'small', 'h4',
  'navbar', 'navbar-expand-lg', 'navbar-dark', 'navbar-brand', 'navbar-toggler',
  'navbar-toggler-icon', 'navbar-collapse', 'navbar-nav', 'nav-item', 'nav-link', 'active',
  'dropdown', 'dropdown-toggle', 'dropdown-menu', 'dropdown-item', 'dropdown-divider',
  'dropdown-header', 'modal', 'modal-dialog', 'modal-xl', 'modal-dialog-centered',
  'modal-content', 'modal-header', 'modal-title', 'modal-body', 'modal-backdrop', 'show',
  'wrapperSection', 'title', 'whiteBox', 'ulShadow', 'projectContainer', 'overlay',
  'projectTitle', 'bs-container', 'nav-menu-root', 'section-spotlight', 'section-lightbulb',
  'section-computer', 'section-orange', 'section-light', 'section-grey', 'section-lightgrey',
  'section-dark', 'section-white', 'footer', 'album', 'blog-post', 'blog-post-title',
  'intro', 'details',
])
const isAllowed = (c) => allowed.has(c) || c.startsWith('tw:') || c === 'fa' || c.startsWith('fa-')

let failures = 0
for (const rel of readdirSync('src', { recursive: true })) {
  if (!rel.endsWith('.vue')) continue
  const file = join('src', rel)
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const match of line.matchAll(/(?<![:\w-])class="([^"]*)"/g)) {
        for (const c of match[1].split(/\s+/).filter(Boolean)) {
          if (!isAllowed(c)) {
            failures++
            console.log(`${file}:${i + 1}: ${c}`)
          }
        }
      }
    })
}
process.exit(failures ? 1 : 0)
```

## Appendix B: Extract the Bootstrap component styles (PR 6; temporary)

Save it as `scripts/extract-bootstrap-subset.mjs` inside the repo, so that `postcss` resolves from `node_modules`. Run `node scripts/extract-bootstrap-subset.mjs` from the repo root, then **delete the script** before committing.

The script keeps, in source order, every selector whose classes are all on the list below. It drops element-only and `:root` selectors (those come from the reset file) and `@keyframes`.

```js
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import postcss from 'postcss'

const KEEP = new Set([
  'btn', 'btn-check', 'btn-info', 'btn-outline-info', 'btn-outline-light', 'btn-lg', 'btn-sm',
  'btn-close', 'card', 'card-body', 'card-text', 'container-fluid', 'nav-link', 'navbar',
  'navbar-brand', 'navbar-nav', 'navbar-collapse', 'navbar-toggler', 'navbar-toggler-icon',
  'navbar-expand-lg', 'navbar-dark', 'dropdown', 'dropdown-toggle', 'dropdown-menu',
  'dropdown-item', 'dropdown-divider', 'dropdown-header', 'modal', 'modal-dialog',
  'modal-dialog-centered', 'modal-xl', 'modal-content', 'modal-header', 'modal-title',
  'modal-body', 'modal-backdrop', 'fade', 'show', 'active', 'disabled', 'lead', 'display-5',
  'small', 'h4',
])

const classesIn = (selector) => [...selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1])
const keepSelector = (selector) => {
  const classes = classesIn(selector)
  return classes.length > 0 && classes.every((c) => KEEP.has(c))
}

const root = postcss.parse(readFileSync('node_modules/bootstrap/dist/css/bootstrap.css', 'utf8'))
root.walkAtRules('keyframes', (atRule) => atRule.remove())
root.walkComments((comment) => comment.remove())
root.walkRules((rule) => {
  const kept = rule.selectors.filter(keepSelector)
  if (kept.length === 0) rule.remove()
  else rule.selectors = kept
})
let removed = true
while (removed) {
  removed = false
  root.walkAtRules((atRule) => {
    if (atRule.nodes && atRule.nodes.length === 0) {
      atRule.remove()
      removed = true
    }
  })
}

const header = `/*!
 * Subset of Bootstrap v5.3.8 (https://getbootstrap.com/) component styles used by this site.
 * Generated once from bootstrap/dist/css/bootstrap.css; maintained by hand from here on.
 * Copyright 2011-2025 The Bootstrap Authors. Licensed under MIT
 * (https://github.com/twbs/bootstrap/blob/main/LICENSE).
 */
`
mkdirSync('src/assets/css/vendor', { recursive: true })
writeFileSync('src/assets/css/vendor/bootstrap-subset.css', header + root.toString().trim() + '\n')
```
