import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'

describe('NavBar', () => {
  it('renders the current project links', () => {
    const wrapper = mount(NavBar)

    expect(wrapper.find('a[href="/appraisals"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/rulesengine"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Digital Appraisals Platform')
    expect(wrapper.text()).toContain('Rules Engine / Self Service')
  })
})
