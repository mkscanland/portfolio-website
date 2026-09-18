import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import LabValidations from './LabValidations.vue'

describe('LabValidations', () => {
  it('renders the lab validation overview and system sections', () => {
    const wrapper = mount(LabValidations)

    expect(wrapper.get('h1').text()).toBe('Lab Validations')
    expect(wrapper.text()).toContain("Validating/Viewing students' working hours and vacation.")
    expect(wrapper.text()).toContain('The System')
    expect(wrapper.text()).toContain('Functionality')
  })
})
