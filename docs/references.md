# References

The repository files described in [architecture.md](architecture.md) are the source of truth for this site's current implementation. These official references inform the agent instructions and Vue conventions:

| Source | Applied here |
| --- | --- |
| [OpenAI: Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Keep a discoverable root entry point that links to project guidance. |
| [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills) | Reserve `.agents/skills/` for focused repository skills; create `SKILL.md` only when there is an actual workflow to encode. |
| [Vue: Style Guide](https://vuejs.org/style-guide/) | Prefer Vue's error-prevention rules and consistent component patterns. |
| [Vue: Testing](https://vuejs.org/guide/scaling-up/testing.html) | Test component behavior and use Vitest with Vue Test Utils where appropriate. |
| [Vue Router: RouterLink](https://router.vuejs.org/api/interfaces/RouterLinkProps.html) | Use route-aware links for new in-app navigation. |
| [eslint-plugin-vue: User Guide](https://eslint.vuejs.org/user-guide/) | Use the flat config presets and understand the scope of `flat/essential`. |
