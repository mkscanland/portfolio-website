import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('renders the portfolio introduction and current projects', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.get('h1').text()).toBe('Matthew Scanland')
    expect(wrapper.text()).toContain('Software Engineer')
    expect(wrapper.text()).toContain('Digital Appraisals Platform')
    expect(wrapper.text()).toContain('Rules Engine / Self Service')
    expect(wrapper.find('a[href="/appraisals"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/rulesengine"]').exists()).toBe(true)
  })

  it('exposes the resume and contact destinations', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.find('a[href="/files/Scanland-Matthew_Resume.pdf"]').exists()).toBe(true)
    expect(wrapper.find('a[href="mailto:mkscanland@gmail.com"]').exists()).toBe(true)
    expect(wrapper.find('a[href="https://www.linkedin.com/in/matthew-scanland/"]').exists()).toBe(true)
  })
})
