import { describe, expect, it, vi } from 'vitest'
import router from './index'

describe('router scroll behavior', () => {
  it('restores a saved position', async () => {
    const savedPosition = { left: 0, top: 120 }
    expect(await router.options.scrollBehavior({}, {}, savedPosition)).toEqual(savedPosition)
  })

  it('waits for page images before scrolling to a hash', async () => {
    const image = document.createElement('img')
    image.loading = 'lazy'
    let finishDecode
    image.decode = vi.fn(() => new Promise((resolve) => (finishDecode = resolve)))
    document.body.append(image)

    try {
      let finished = false
      const scroll = router.options.scrollBehavior({ hash: '#contact' }, {}, null)
      scroll.then(() => (finished = true))
      await vi.waitFor(() => expect(image.decode).toHaveBeenCalled())
      expect(image.loading).toBe('eager')
      expect(finished).toBe(false)

      finishDecode()
      expect(await scroll).toEqual({ el: '#contact' })
    } finally {
      image.remove()
    }
  })

  it('starts other navigations at the top', async () => {
    expect(await router.options.scrollBehavior({ hash: '' }, {}, null)).toEqual({ top: 0 })
  })
})
