import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'

import DigitalAppraisals from './DigitalAppraisals.vue'

describe('DigitalAppraisals', () => {
  const mountView = () =>
    mount(DigitalAppraisals, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

  it('renders the platform purpose, consumers, and ownership', () => {
    const wrapper = mountView()

    expect(wrapper.get('h1').text()).toBe('Digital Appraisals Platform')
    expect(wrapper.text()).toContain('internal Sonic applications and external partners')
    expect(wrapper.text()).toContain('one of the primary engineers responsible for the DAP API')
    expect(wrapper.text()).toContain('FastAPI, Python, Azure App Service')
  })

  it('describes the appraisal workflow, scale, and current architecture direction', () => {
    const wrapper = mountView()

    expect(wrapper.text()).toContain('DAP operates as a state machine')
    expect(wrapper.text()).toContain('around 10,000 offers per day')
    expect(wrapper.text()).toContain('approximately 200,000 API calls')
    expect(wrapper.text()).toContain('managed Azure message queue')
    expect(wrapper.findComponent(RouterLinkStub).props('to')).toBe('/rulesengine')
  })
})
