import { createMemoryHistory, createRouter } from 'vue-router'

// Resolves every path so RouterLink renders real hrefs in component tests.
export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
  })
}
