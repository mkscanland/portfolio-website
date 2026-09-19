import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import RulesEngine from './RulesEngine.vue'

describe('RulesEngine', () => {
  it('renders the rule types and performance improvement', () => {
    const wrapper = mount(RulesEngine)

    expect(wrapper.get('h1').text()).toBe('Rules Engine / Self Service')
    expect(wrapper.text()).toContain('pricing, fee, and vehicle-segmentation rules')
    expect(wrapper.text()).toContain('Preprocessed Rule Priority')
    expect(wrapper.text()).toContain('from roughly four seconds to under 300 milliseconds')
  })

  it('describes Self Service capabilities and separates current work from plans', () => {
    const wrapper = mount(RulesEngine)

    expect(wrapper.text()).toContain('create, view, validate, search, and manage rules')
    expect(wrapper.text()).toContain('current modernization work is focused')
    expect(wrapper.text()).toContain('remains in the planning phase and has not been implemented')
  })
})
