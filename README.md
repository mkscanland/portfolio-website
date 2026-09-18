# Portfolio website

Matthew Scanland's portfolio website, built with Vue 3 and Vite.

## Repository guide

Start with the guide relevant to your change:

- [Architecture](docs/architecture.md): entry points, routes, pages, shared components, assets, and deployment.
- [Conventions](docs/conventions.md): Vue patterns, content accuracy, linting, and branch names.
- [Workflow](docs/workflow.md): how to make a change and verify it before finishing.
- [References](docs/references.md): official guidance behind these decisions.

The root [AGENTS.md](AGENTS.md) is only an entry point. Keep detailed guidance in `docs/` and update it when the project structure or commands change. Repository-specific Codex skills can be added under [`.agents/skills/`](.agents/skills/) when a repeatable workflow warrants one; that directory currently contains no skills.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

`npm run lint` applies available fixes. To check without changing files, run `npm run lint:check`.
