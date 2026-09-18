import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import InternalRebuild from './InternalRebuild.vue'

describe('InternalRebuild', () => {
  it('renders the project overview and implementation sections', () => {
    const wrapper = mount(InternalRebuild)

    expect(wrapper.get('h1').text()).toBe('Internal Website Rebuild')
    expect(wrapper.text()).toContain('Supporting CPES staff, students, and faculty')
    expect(wrapper.text()).toContain('Project Outcome')
    expect(wrapper.text()).toContain('Applications')
    expect(wrapper.get('a[href="/webapps"]').exists()).toBe(true)
  })
})
