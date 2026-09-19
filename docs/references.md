# References

The repository files described in [architecture.md](architecture.md) are the source of truth for this site's current implementation. These official references inform the agent instructions and Vue conventions:

| Source | Applied here |
| --- | --- |
| [OpenAI: Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Keep a discoverable root entry point that links to project guidance. |
| [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills) | Reserve `.agents/skills/` for focused repository skills; create `SKILL.md` only when there is an actual workflow to encode. |
| [Vue: Style Guide](https://vuejs.org/style-guide/) | Prefer Vue's error-prevention rules and consistent component patterns. |
| [Vue: Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html) | Colocate component-specific styles and use scoped CSS where appropriate. |
| [Vue: Slots](https://vuejs.org/guide/components/slots.html) | Let parents provide content to reusable components when that content varies by caller. |
| [Vue: Props](https://vuejs.org/guide/components/props.html) | Declare simple inputs explicitly on shared layout and card components. |
| [Vue: Testing](https://vuejs.org/guide/scaling-up/testing.html) | Test component behavior with Vitest and rendered layout behavior with browser tests. |
| [Vue: Accessibility](https://vuejs.org/guide/best-practices/accessibility.html) | Let users select interactive project cards by keyboard as well as pointer. |
| [Vue: Performance](https://vuejs.org/guide/best-practices/performance.html) | Check bundle size before loading an entire icon runtime; preserve existing lazy routes. |
| [Vue: Security](https://vuejs.org/guide/best-practices/security.html) | Render archive details as text instead of inserting HTML into the modal. |
| [Vue Router: RouterLink](https://router.vuejs.org/api/interfaces/RouterLinkProps.html) | Use route-aware links for new in-app navigation. |
| [Bootstrap: Containers](https://getbootstrap.com/docs/5.3/layout/containers/) | Constrain and center content with Bootstrap's responsive container widths instead of page-specific maximum widths. |
| [Bootstrap: Grid](https://getbootstrap.com/docs/5.3/layout/grid/) | Build mobile-first layouts with containers, rows, columns, and the framework's standard breakpoints. |
| [Bootstrap: Gutters](https://getbootstrap.com/docs/5.3/layout/gutters/) | Use responsive gutter utilities for spacing within grid layouts. |
| [MDN: CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units) | Select relative units when an element should scale; retain `px` for deliberate fine details. |
| [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) | Start with flexible layouts and add focused media-query adaptations when a layout needs them. |
| [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) | Bound fluid type and spacing between readable minimum and maximum values. |
| [eslint-plugin-vue: User Guide](https://eslint.vuejs.org/user-guide/) | Use the flat config presets and understand the scope of `flat/essential`. |
