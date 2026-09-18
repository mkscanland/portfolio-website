import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import RandomForest from './RandomForest.vue'

describe('RandomForest', () => {
  it('renders the categorization overview and results sections', () => {
    const wrapper = mount(RandomForest)

    expect(wrapper.get('h1').text()).toBe('Random Forest Categorization')
    expect(wrapper.text()).toContain('Structure')
    expect(wrapper.text()).toContain('Hyperparameter Tuning')
    expect(wrapper.text()).toContain('Best Results:')
    expect(wrapper.get('a[href="https://github.com/mkscanland/Random-Forest"]').exists()).toBe(true)
  })
})
