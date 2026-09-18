import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import UnderDevelopment from './UnderDevelopment.vue'

describe('UnderDevelopment', () => {
  it('renders an accessible under-development placeholder', () => {
    const wrapper = mount(UnderDevelopment)

    expect(wrapper.get('img[alt="Under Development"]').exists()).toBe(true)
    expect(wrapper.get('.container').exists()).toBe(true)
  })
})
