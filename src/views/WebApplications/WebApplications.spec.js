import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import WebApplications from './WebApplications.vue'

describe('WebApplications', () => {
  it('renders current and archived project sections', () => {
    const wrapper = mount(WebApplications)

    expect(wrapper.get('h1').text()).toBe('Web Applications Archive')
    expect(wrapper.text()).toContain('Digital Appraisals Platform')
    expect(wrapper.text()).toContain('Rules Engine / Self Service')
    expect(wrapper.text()).toContain('Internal Website Rebuild')
    expect(wrapper.text()).toContain('Other Projects')
  })

  it('populates the project details modal when an archived project is selected', async () => {
    const wrapper = mount(WebApplications)

    await wrapper.get('#internalRebuild').trigger('click')

    expect(wrapper.get('#infoModalTitle').text()).toBe('Internal Website Rebuild')
    expect(wrapper.get('#infoModal .intro').text()).toContain('From 2019 to 2023')
    expect(wrapper.get('#infoModal .details').text()).toContain('This platform was built')
  })
})
