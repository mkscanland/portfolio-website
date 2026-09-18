import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ProjectDetailLayout from './ProjectDetailLayout.vue'

describe('ProjectDetailLayout', () => {
  it('renders each page section from its named and default slots', () => {
    const wrapper = mount(ProjectDetailLayout, {
      props: { title: 'A project' },
      slots: {
        subtitle: '<p>Short introduction</p>',
        intro: '<p>Overview</p>',
        sidebar: '<h2>Technology</h2>',
        default: '<h2>Details</h2>',
      },
    })

    expect(wrapper.get('h1').text()).toBe('A project')
    expect(wrapper.get('.col-lg-6 p').text()).toBe('Short introduction')
    expect(wrapper.get('.border-bottom p').text()).toBe('Overview')
    expect(wrapper.get('.col-md-4 h2').text()).toBe('Technology')
    expect(wrapper.get('article h2').text()).toBe('Details')
  })
})
