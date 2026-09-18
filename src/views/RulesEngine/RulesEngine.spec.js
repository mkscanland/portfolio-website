import { describe, expect, it } from 'vitest'

describe('RulesEngine', () => {
  it('renders the rules engine overview and current direction', async () => {
    const { default: RulesEngine } = await import('./RulesEngine.vue')
    const { mount } = await import('@vue/test-utils')
    const wrapper = mount(RulesEngine)

    expect(wrapper.get('h1').text()).toBe('Rules Engine / Self Service')
    expect(wrapper.text()).toContain('Managing vehicle business rules and modernizing legacy systems.')
    expect(wrapper.text()).toContain('Rules Engine')
    expect(wrapper.text()).toContain('Self Service')
    expect(wrapper.text()).toContain('Current Direction')
  })
})
