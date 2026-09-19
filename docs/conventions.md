# Conventions

## Vue and content

- Keep a route view or shared component with its `.spec.js` in a directory of the same name. Use the current JavaScript single-file component style; prefer `<script setup>` for new component logic when it fits. Do not rewrite an existing Options API component solely for consistency.
- Reuse the existing Bootstrap utilities and `src/assets/css/site.css` before adding CSS. Keep component-specific rules scoped when appropriate, as in `src/App/App.vue`.
- Use props for simple component values and slots for caller-supplied markup. `ProjectDetailLayout` uses named slots for subtitle, intro, and sidebar content and its default slot for the article; `ProjectCard` uses a named metadata slot and a default description slot. Keep page-specific article content in each view so project-specific claims are easy to review.
- Store repeated static page content in `src/content/` and render it with `v-for` using a stable item key. A card and its modal should consume the same project object rather than keeping separate copies of the text.
- Handle changing page state through Vue reactivity and events. The project archive modal uses a selected project ref and text interpolation; do not mutate its DOM with jQuery or inject project details as HTML.
- Use `RouterLink` for new links between routes and ordinary `<a>` links for external URLs and static downloads. For example: `<RouterLink to="/rulesengine">Rules Engine</RouterLink>` and `<a href="/files/Scanland-Matthew_Resume.pdf">Resume</a>`.
- Follow Vue's essential style rules for templates, props, and lists. For example, use a stable key: `<li v-for="project in projects" :key="project.id">{{ project.name }}</li>`.
- Keep portfolio claims factual and in the owner's voice. Check existing content and user-provided references before updating a role, result, date, or metric. If a needed fact is uncertain, use an explicit placeholder and ask for the fact instead of inventing it.
- Test observable behavior or important rendered content with Vitest and Vue Test Utils. For example, a view test can assert its heading and project link; a button test can trigger a click and assert the result. Avoid tests that only mirror implementation details or static icon files.

## Responsive CSS

- Prefer Bootstrap's existing grid and responsive utilities before custom layout rules. Keep component-specific styling in its single-file component when appropriate; use `src/assets/css/site.css` for shared global styling.
- Choose units by intent; do not mechanically convert `px` to relative units.

| Need | Preferred approach |
| --- | --- |
| Available layout space | Use flex/grid and constraints such as `min()`, `max()`, `clamp()`, `max-width`, and `min-width`. |
| Text or spacing that should scale with its context | Use `em` or `rem`. |
| Exact visual details | Keep `px` for one-pixel borders, outlines, shadows, fixed image decorations, and other deliberate pixel dimensions. |
| A viewport-specific layout change | Add a focused media query. Keep the surrounding unit convention unless a different unit communicates the requirement more clearly. |

- Diagnose the element creating overflow before changing global constraints. Do not use `overflow-x: hidden` or `overflow-x: clip` to conceal a layout bug.
- For responsive changes, test the affected route at narrow mobile, standard mobile, tablet, and desktop widths.

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
