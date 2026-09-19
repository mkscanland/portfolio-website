import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'narrow mobile', width: 320, height: 900 },
  { name: 'mobile', width: 375, height: 900 },
  { name: 'Bootstrap sm', width: 576, height: 900 },
  { name: 'Bootstrap md', width: 768, height: 900 },
  { name: 'desktop', width: 1280, height: 900 },
]

const routes = ['/', '/webapps', '/appraisals']

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} fits the ${viewport.name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(route)

      const layout = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth
        const titles = [...document.querySelectorAll('.title')].map((element) => {
          const rect = element.getBoundingClientRect()

          return {
            text: element.textContent.trim(),
            left: rect.left,
            right: rect.right,
            height: rect.height,
            scrollHeight: element.scrollHeight,
          }
        })

        return {
          viewportWidth,
          documentWidth: document.documentElement.scrollWidth,
          titles,
        }
      })

      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)

      for (const title of layout.titles) {
        expect(title.left, `${title.text} starts outside the viewport`).toBeGreaterThanOrEqual(0)
        expect(title.right, `${title.text} ends outside the viewport`).toBeLessThanOrEqual(
          layout.viewportWidth,
        )
        expect(title.height, `${title.text} clips vertically`).toBeGreaterThanOrEqual(
          title.scrollHeight,
        )
      }
    })
  }
}

test('mobile project cards expose all content without a fixed-height crop', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/webapps')

  const cards = page.locator('.projectContainer')
  await expect(cards.first()).toBeVisible()

  const cardLayouts = await cards.evaluateAll((elements) =>
    elements.map((element) => ({
      height: element.getBoundingClientRect().height,
      scrollHeight: element.scrollHeight,
      overlayPosition: getComputedStyle(element.querySelector('.overlay')).position,
    })),
  )

  for (const card of cardLayouts) {
    expect(card.height).toBeGreaterThanOrEqual(card.scrollHeight)
    expect(card.overlayPosition).toBe('static')
  }
})
