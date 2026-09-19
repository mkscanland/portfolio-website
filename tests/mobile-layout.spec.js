import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'narrow mobile', width: 320, height: 900 },
  { name: 'mobile', width: 375, height: 900 },
  { name: 'Bootstrap sm', width: 576, height: 900 },
  { name: 'Bootstrap md', width: 768, height: 900 },
  { name: 'Bootstrap lg', width: 992, height: 900 },
  { name: 'desktop', width: 1280, height: 900 },
]

const routes = [
  '/',
  '/appraisals',
  '/rulesengine',
  '/webapps',
  '/randomforest',
  '/validations',
  '/itsystems',
  '/rebuild',
  '/annualreports',
]

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} fits the ${viewport.name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(route)

      const layout = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth
        const titles = [...document.querySelectorAll('.title')].map((element) => {
          const rect = element.getBoundingClientRect()
          const range = document.createRange()
          range.selectNodeContents(element)

          return {
            text: element.textContent.trim(),
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            textRects: [...range.getClientRects()].map((textRect) => ({
              left: textRect.left,
              right: textRect.right,
              top: textRect.top,
              bottom: textRect.bottom,
            })),
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

        for (const textRect of title.textRects) {
          expect(textRect.left, `${title.text} text clips on the left`).toBeGreaterThanOrEqual(
            title.left,
          )
          expect(textRect.right, `${title.text} text clips on the right`).toBeLessThanOrEqual(
            title.right,
          )
          expect(textRect.top, `${title.text} text clips on top`).toBeGreaterThanOrEqual(title.top)
          expect(textRect.bottom, `${title.text} text clips on bottom`).toBeLessThanOrEqual(
            title.bottom,
          )
        }
      }
    })
  }
}

test('collapsed navigation opens dropdowns below the Bootstrap lg breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 991, height: 900 })
  await page.goto('/')

  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await page.getByRole('link', { name: 'Portfolio', exact: true }).click()

  await expect(page.getByRole('link', { name: 'Digital Appraisals Platform' })).toBeVisible()
})

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
    expect(card.scrollHeight - card.height).toBeLessThanOrEqual(1)
    expect(card.overlayPosition).toBe('static')
  }
})
