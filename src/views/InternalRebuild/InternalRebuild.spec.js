import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import InternalRebuild from './InternalRebuild.vue'
import { createTestRouter } from '@/test-utils/router'

describe('InternalRebuild', () => {
  it('renders the project overview and implementation sections', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(InternalRebuild, { global: { plugins: [router] } })

    expect(wrapper.get('h1').text()).toBe('Internal Website Rebuild')
    expect(wrapper.text()).toContain('Supporting CPES staff, students, and faculty')
    expect(wrapper.text()).toContain('Project Outcome')
    expect(wrapper.text()).toContain('Applications')
    expect(wrapper.get('a[href="/webapps"]').exists()).toBe(true)
  })
})
