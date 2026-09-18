import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import DigitalAppraisals from './DigitalAppraisals.vue'

describe('DigitalAppraisals', () => {
  it('renders the platform purpose and technical overview', () => {
    const wrapper = mount(DigitalAppraisals)

    expect(wrapper.get('h1').text()).toBe('Digital Appraisals Platform')
    expect(wrapper.text()).toContain('Contractual vehicle offers from a VIN and selected vehicle information.')
    expect(wrapper.text()).toContain('FastAPI, Python, Azure App Service')
    expect(wrapper.get('a[href="/rulesengine"]').text()).toBe('Rules Engine / Self Service')
  })
})
