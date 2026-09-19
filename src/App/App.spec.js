import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import App from './App.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import SiteFooter from '../components/SiteFooter/SiteFooter.vue'

describe('App', () => {
  it('renders the site shell around routed content', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.get('.app-shell').exists()).toBe(true)
    expect(wrapper.find('#app').exists()).toBe(false)
    expect(wrapper.findComponent(NavBar).exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
    expect(wrapper.findComponent(SiteFooter).exists()).toBe(true)
  })
})
