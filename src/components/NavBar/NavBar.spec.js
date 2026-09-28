import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import NavBar from './NavBar.vue'
import { createTestRouter } from '@/test-utils/router'

describe('NavBar', () => {
  it('renders the primary navigation and project links', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavBar, { global: { plugins: [router] } })

    expect(wrapper.get('a[href="/"]').text()).toBe('Home')
    expect(wrapper.get('a[href="/appraisals"]').text()).toBe('Digital Appraisals Platform')
    expect(wrapper.get('a[href="/rulesengine"]').text()).toBe('Rules Engine / Self Service')
    expect(wrapper.get('a[href="/rebuild"]').text()).toBe('Internal Website Rebuild')
    expect(wrapper.get('a[href="/randomforest"]').text()).toBe('Random Forest')
    expect(wrapper.get('a[href="/validations"]').text()).toBe('Lab Validations')
    expect(wrapper.get('a[href="/webapps"]').text()).toBe('Other Web Apps')
    expect(wrapper.get('a[href="/itsystems"]').text()).toBe('IT Systems')
  })

  it('provides resume, guide, and contact destinations', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavBar, { global: { plugins: [router] } })

    expect(wrapper.find('a[href="/files/Scanland-Matthew_Resume.pdf"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/files/Scanland-Matthew_Resume.docx"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/files/Azure-Data-Lake-Plan_Public Copy.pdf"]').exists()).toBe(true)
    expect(wrapper.find('a[href="https://www.linkedin.com/in/matthew-scanland/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="mailto:mkscanland@gmail.com"]').exists()).toBe(true)
  })

  it('opens the mobile menu and closes it after route navigation', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavBar, { global: { plugins: [router] } })

    await wrapper.get('button[aria-label="Toggle navigation"]').trigger('click')
    expect(wrapper.get('#navbarNavDropdown').classes()).toContain('show')

    await router.push('/webapps')
    await flushPromises()
    expect(wrapper.get('#navbarNavDropdown').classes()).not.toContain('show')
  })

  it('opens the Portfolio dropdown on click', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavBar, { global: { plugins: [router] } })

    const portfolio = wrapper.findAll('button').find((button) => button.text() === 'Portfolio')
    expect(portfolio).toBeDefined()
    await portfolio.trigger('click')
    await flushPromises()
    expect(portfolio.classes()).toContain('show')
  })

  it('closes the menu when a link targets the current route', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavBar, { global: { plugins: [router] } })

    await wrapper.get('button[aria-label="Toggle navigation"]').trigger('click')
    await wrapper.get('a[href="/"]').trigger('click')
    expect(wrapper.get('#navbarNavDropdown').classes()).not.toContain('show')
  })

  it('marks only the current route as the current page', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavBar, { global: { plugins: [router] } })

    expect(wrapper.get('a[href="/"]').attributes('aria-current')).toBe('page')
    await router.push('/webapps')
    await flushPromises()
    expect(wrapper.get('a[href="/"]').attributes('aria-current')).toBeUndefined()
    expect(wrapper.get('a[href="/webapps"]').attributes('aria-current')).toBe('page')
  })
})
