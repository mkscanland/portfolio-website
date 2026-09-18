import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import SiteFooter from './SiteFooter.vue'

describe('SiteFooter', () => {
  it('renders the site technology description and contact address', () => {
    const wrapper = mount(SiteFooter)

    expect(wrapper.get('footer.footer').exists()).toBe(true)
    expect(wrapper.text()).toContain('Vue.js')
    expect(wrapper.text()).toContain('Bootstrap')
    expect(wrapper.get('a[href="mailto:mkscanland@gmail.com"]').exists()).toBe(true)
  })
})
