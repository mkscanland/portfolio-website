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
    expect(wrapper.get('[data-testid="project-subtitle"] p').text()).toBe('Short introduction')
    expect(wrapper.get('[data-testid="project-intro"] p').text()).toBe('Overview')
    expect(wrapper.get('[data-testid="project-sidebar"] h2').text()).toBe('Technology')
    expect(wrapper.get('article h2').text()).toBe('Details')
  })
})
