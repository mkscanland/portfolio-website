import { expect, test } from '@playwright/test'

const titleText = 'Important Practices & Goals'

for (const width of [320, 360]) {
  test(`${titleText} stays on one line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const title = page.locator('.title').filter({ hasText: titleText })

    await expect(title).toHaveCSS('white-space', 'nowrap')

    const layout = await title.evaluate((element) => {
      const titleRect = element.getBoundingClientRect()
      const textRange = document.createRange()
      textRange.selectNodeContents(element)

      const textRects = [...textRange.getClientRects()]

      return {
        documentWidth: document.documentElement.scrollWidth,
        titleRect: {
          left: titleRect.left,
          right: titleRect.right,
        },
        textRects: textRects.map((rect) => ({
          left: rect.left,
          right: rect.right,
        })),
      }
    })

    expect(layout.textRects).toHaveLength(1)
    expect(layout.textRects[0].left).toBeGreaterThanOrEqual(layout.titleRect.left)
    expect(layout.textRects[0].right).toBeLessThanOrEqual(layout.titleRect.right)
    expect(layout.documentWidth).toBeLessThanOrEqual(width)
  })
}
