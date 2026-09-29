# Conventions

## Vue and content

- Keep a route view or shared component with its `.spec.js` in a directory of the same name. Use the current JavaScript single-file component style; prefer `<script setup>` for new component logic when it fits. Do not rewrite an existing Options API component solely for consistency.
- Use props for simple component values and slots for caller-supplied markup. `ProjectDetailLayout` uses named slots for subtitle, intro, and sidebar content and its default slot for the article; `ProjectCard` uses a named metadata slot and a default description slot. Keep page-specific article content in each view so project-specific claims are easy to review.
- Store repeated static page content in `src/content/` and render it with `v-for` using a stable item key. A card and its modal should consume the same project object rather than keeping separate copies of the text.
- Handle changing page state through Vue reactivity and events. The project archive modal uses a selected project ref and text interpolation; do not mutate its DOM with jQuery or inject project details as HTML.
- Use `RouterLink` for new links between routes and ordinary `<a>` links for external URLs and static downloads. For example: `<RouterLink to="/rulesengine">Rules Engine</RouterLink>` and `<a href="/files/Scanland-Matthew_Resume.pdf">Resume</a>`.
- Follow Vue's essential style rules for templates, props, and lists. For example, use a stable key: `<li v-for="project in projects" :key="project.id">{{ project.name }}</li>`.
- Keep portfolio claims factual and in the owner's voice. Check existing content and user-provided references before updating a role, result, date, or metric. If a needed fact is uncertain, use an explicit placeholder and ask for the fact instead of inventing it.
- Test observable behavior or important rendered content with Vitest and Vue Test Utils. For example, a view test can assert its heading and project link; a button test can trigger a click and assert the result. Avoid tests that only mirror implementation details or static icon files.

## Styling

During the migration, use the `tw:` prefix for new Tailwind utilities so they do not collide with Bootstrap classes. `src/assets/css/legacy.css` loads `site.css` and Bootstrap in the legacy layer, before `main.css` loads Tailwind's theme and utilities. Reuse the existing `site.css` rules and retained component classes where appropriate. Scoped component `<style>` blocks and Font Awesome are unlayered, so their normal rules take priority over both Bootstrap and Tailwind utilities. Keep component-specific rules scoped when appropriate, as in `src/App/App.vue`.

| Bootstrap spacing step | Size | Tailwind spacing step |
| --- | --- | --- |
| 0 | 0 | 0 |
| 1 | 0.25rem | 1 |
| 2 | 0.5rem | 2 |
| 3 | 1rem | 4 |
| 4 | 1.5rem | 6 |
| 5 | 3rem | 12 |

This applies to `p`, `m`, `px`, `py`, `pt`, `pb`, `mb`, `mt`, `mx`, `me`, and `gap`. Put responsive breakpoints first: `py-lg-5` becomes `tw:lg:py-12`. Do not use `@apply`. Avoid combining `py-*` with `pt-*` or `pb-*` on the same element; use side-specific utilities instead. For font sizes, use bracketed values such as `tw:text-[1.25rem]` when a named utility would also change line height.

The following classes remain in templates after Bootstrap is removed. Their styles are supplied by the extracted Bootstrap component CSS, `site.css`, or Font Awesome:

- Buttons: `btn`, `btn-lg`, `btn-sm`, `btn-info`, `btn-outline-info`, `btn-outline-light`, `btn-close`.
- Cards: `card`, `card-body`, `card-text`.
- Navbar: `navbar`, `navbar-expand-lg`, `navbar-dark`, `navbar-brand`, `navbar-toggler`, `navbar-toggler-icon`, `navbar-collapse`, `navbar-nav`, `nav-item`, `nav-link`, `active`.
- Dropdowns: `dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-item`, `dropdown-divider`, `dropdown-header`.
- Modal: `modal`, `modal-dialog`, `modal-xl`, `modal-dialog-centered`, `modal-content`, `modal-header`, `modal-title`, `modal-body`, `modal-backdrop`, `show`.
- Other Bootstrap styles: `container-fluid`, `lead`, `display-5`, `small`, `h4`.
- Custom page structure: `wrapperSection`, `title`, `whiteBox`, `ulShadow`, `bs-container`, `nav-menu-root`.
- Custom project cards: `projectContainer`, `overlay`, `projectTitle`, `hasMore`.
- Custom section backgrounds: `section-spotlight`, `section-lightbulb`, `section-computer`, `section-orange`, `section-light`, `section-grey`, `section-lightgrey`, `section-dark`, `section-white`.
- Hooks without styles: `footer`, `album`, `blog-post`, `blog-post-title`, `intro`, `details`.
- Font Awesome: `fa` and `fa-*`.

## Linting and formatting

The existing ESLint flat config uses `eslint-plugin-vue`'s `flat/essential` rules, the Vitest plugin for colocated `src/**/*.spec.js` files, and `eslint-config-prettier`. Oxlint checks correctness and Vue/Vitest patterns; Prettier uses `.prettierrc.json` (`singleQuote`, no semicolons, 100-character print width). Follow these repository settings rather than imposing a new style.

| Purpose | Command | Effect |
| --- | --- | --- |
| Check without edits | `npm run lint:check` | Runs Oxlint and ESLint without `--fix`; use as the final lint gate. |
| Apply available lint fixes | `npm run lint` | Runs the existing Oxlint and ESLint fix scripts; inspect the diff afterwards. |
| Format application files | `npm run format` | Writes Prettier formatting under `src/`; inspect the diff afterwards. |

## Branch names

Use lowercase words separated by hyphens after the prefix:

| Work | Prefix | Example |
| --- | --- | --- |
| Feature | `feature/` | `feature/ai-tooling` |
| Bug | `bugfix/` | `bugfix/mobile-nav` |
| Urgent production fix | `hotfix/` | `hotfix/broken-resume-link` |
