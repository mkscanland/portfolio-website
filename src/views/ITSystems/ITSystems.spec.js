import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ITSystems from './ITSystems.vue'

describe('ITSystems', () => {
  it('renders the systems overview and project links', () => {
    const wrapper = mount(ITSystems)

    expect(wrapper.get('h1').text()).toBe('IT Systems')
    expect(wrapper.text()).toContain('Microsoft Azure')
    expect(wrapper.text()).toContain('Docker/Xibo')
    expect(wrapper.get('a[href="https://xibosignage.com/"]').exists()).toBe(true)
    expect(wrapper.get('a[href="/rebuild"]').text()).toBe('Internal Website Rebuild')
  })
})
