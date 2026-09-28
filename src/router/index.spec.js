import { describe, expect, it } from 'vitest'
import router from './index'

describe('router scroll behavior', () => {
  it('restores a saved position', () => {
    const savedPosition = { left: 0, top: 120 }
    expect(router.options.scrollBehavior({}, {}, savedPosition)).toEqual(savedPosition)
  })

  it('scrolls to the target hash', () => {
    expect(router.options.scrollBehavior({ hash: '#contact' }, {}, null)).toEqual({
      el: '#contact',
    })
  })

  it('starts other navigations at the top', () => {
    expect(router.options.scrollBehavior({ hash: '' }, {}, null)).toEqual({ top: 0 })
  })
})
