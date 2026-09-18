import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ProjectCard from './ProjectCard.vue'

describe('ProjectCard', () => {
  const props = {
    image: '/example.png',
    alt: 'Example project',
    title: 'A project',
  }
  const slots = {
    meta: '<p>Technology</p>',
    default: '<p>Description</p>',
  }

  it('renders project-specific imagery and content without making static cards interactive', () => {
    const wrapper = mount(ProjectCard, { props, slots })

    expect(wrapper.get('img').attributes('alt')).toBe('Example project')
    expect(wrapper.get('.projectTitle').text()).toBe('A project')
    expect(wrapper.get('.overlay').text()).toContain('Technology')
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('allows click and keyboard selection of an interactive project', async () => {
    const wrapper = mount(ProjectCard, { props: { ...props, interactive: true }, slots })

    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('tabindex')).toBe('0')
    await wrapper.trigger('click')
    await wrapper.trigger('keydown.enter')
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted('select')).toHaveLength(3)
    expect(wrapper.emitted('select')[0][0]).toEqual({ title: 'A project', image: '/example.png' })
  })
})
