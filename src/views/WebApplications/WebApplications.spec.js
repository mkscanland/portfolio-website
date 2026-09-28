import { describe, expect, it } from 'vitest'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'

import WebApplications from './WebApplications.vue'
import { createTestRouter } from '@/test-utils/router'

describe('WebApplications', () => {
  it('renders current and archived project sections', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(WebApplications, {
      global: { plugins: [router] },
    })

    expect(wrapper.get('h1').text()).toBe('Web Applications Archive')
    expect(wrapper.text()).toContain('Digital Appraisals Platform')
    expect(wrapper.text()).toContain('Rules Engine / Self Service')
    expect(wrapper.text()).toContain('Internal Website Rebuild')
    expect(wrapper.text()).toContain('Other Projects')
  })

  it('populates the project details modal when an archived project is selected', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(WebApplications, {
      attachTo: document.body,
      global: { plugins: [router] },
    })

    try {
      await wrapper.get('#internalRebuild').trigger('click')
      await flushPromises()

      const modal = new DOMWrapper(document.querySelector('#infoModal'))
      expect(modal.get('.modal-title').text()).toBe('Internal Website Rebuild')
      expect(modal.attributes('aria-labelledby')).toBe(modal.get('.modal-title').attributes('id'))
      expect(modal.get('.intro').text()).toContain('From 2019 to 2023')
      expect(modal.get('.details').text()).toContain('This platform was built')
    } finally {
      wrapper.unmount()
    }
  })

  it('updates modal content for keyboard selection and renders details as text', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(WebApplications, {
      global: { plugins: [router] },
    })

    try {
      await wrapper.get('#checkout').trigger('keydown.enter')
      await flushPromises()

      const modal = new DOMWrapper(document.querySelector('#infoModal'))
      expect(modal.get('.modal-title').text()).toBe('Checkout Tracker')
      expect(modal.get('#infoModalBody img').attributes('alt')).toBe('Checkout Tracker')
      expect(modal.get('.details').text()).toContain('“status”')
      expect(modal.find('q').exists()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
})
