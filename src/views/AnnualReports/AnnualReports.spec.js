import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AnnualReports from './AnnualReports.vue'

describe('AnnualReports', () => {
  it('renders the lab validations overview', () => {
    const wrapper = mount(AnnualReports)

    expect(wrapper.get('h1').text()).toBe('Lab Validations')
    expect(wrapper.text()).toContain("Validating/Viewing students' working hours and vacation.")
    expect(wrapper.text()).toContain('Main Information')
    expect(wrapper.text()).toContain('The System')
  })
})
