import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import NavBar from './NavBar.vue'

describe('NavBar', () => {
  it('renders the primary navigation and project links', () => {
    const wrapper = mount(NavBar)

    expect(wrapper.get('a[href="/"]').text()).toBe('Home')
    expect(wrapper.get('a[href="/appraisals"]').text()).toBe('Digital Appraisals Platform')
    expect(wrapper.get('a[href="/rulesengine"]').text()).toBe('Rules Engine / Self Service')
    expect(wrapper.get('a[href="/rebuild"]').text()).toBe('Internal Website Rebuild')
    expect(wrapper.get('a[href="/randomforest"]').text()).toBe('Random Forest')
    expect(wrapper.get('a[href="/validations"]').text()).toBe('Lab Validations')
    expect(wrapper.get('a[href="/webapps"]').text()).toBe('Other Web Apps')
    expect(wrapper.get('a[href="/itsystems"]').text()).toBe('IT Systems')
  })

  it('provides resume, guide, and contact destinations', () => {
    const wrapper = mount(NavBar)

    expect(wrapper.find('a[href="/files/Scanland-Matthew_Resume.pdf"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/files/Scanland-Matthew_Resume.docx"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/files/Azure-Data-Lake-Plan_Public Copy.pdf"]').exists()).toBe(true)
    expect(wrapper.find('a[href="https://www.linkedin.com/in/matthew-scanland/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="mailto:mkscanland@gmail.com"]').exists()).toBe(true)
  })
})
