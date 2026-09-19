import { expect, test } from '@playwright/test'

const titleText = 'Important Practices & Goals'

for (const width of [320, 360]) {
  test(`${titleText} stays on one line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const title = page.locator('.title').filter({ hasText: titleText })

    await expect(title).toHaveCSS('white-space', 'nowrap')

    const layout = await title.evaluate((element) => ({
      clientHeight: element.clientHeight,
      clientWidth: element.clientWidth,
      scrollHeight: element.scrollHeight,
      scrollWidth: element.scrollWidth,
    }))
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth)

    expect(layout.scrollHeight).toBeLessThanOrEqual(layout.clientHeight)
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
    expect(documentWidth).toBeLessThanOrEqual(width)
  })
}
