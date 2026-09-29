import { expect, test } from '@playwright/test'

for (const viewport of [
  { width: 1280, height: 900 },
  { width: 375, height: 812 },
]) {
  for (const route of ['/webapps', '/itsystems']) {
    test(`contact link from ${route} at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(route)
      await page.getByRole('link', { name: 'Contact me' }).click()
      await expect(page).toHaveURL(/\/#contact$/)
      await expect.poll(async () => {
        const box = await page.locator('#contact').boundingBox()
        // The empty anchor can land a fraction of a pixel above the viewport after scrolling.
        return box && box.y < viewport.height && box.y + box.height > -1
      }).toBe(true)
    })
  }
}

test('dragging from dialog text onto backdrop leaves it open', async ({ page }) => {
  await page.goto('/webapps')
  await page.locator('#internalRebuild').click()
  const dialog = page.locator('#infoModal')
  await expect(dialog).toBeVisible()
  const details = await dialog.locator('.details').boundingBox()
  const backdrop = await dialog.boundingBox()
  await page.mouse.move(details.x + 20, details.y + 8)
  await page.mouse.down()
  await page.mouse.move(backdrop.x + 5, details.y + 8, { steps: 5 })
  await page.mouse.up()
  await expect(dialog).toBeVisible()

  await page.mouse.click(backdrop.x + 5, details.y + 8)
  await expect(dialog).not.toBeVisible()
})

for (const [route, navLabel, dropdown] of [
  ['/', 'Home', false],
  ['/webapps', 'Other Web Apps', true],
]) {
  test(`same-route ${navLabel} navigation closes the mobile menu`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(route)
    await page.getByRole('button', { name: 'Toggle navigation' }).click()
    if (dropdown) await page.locator('nav').getByRole('button', { name: 'Portfolio' }).click()
    await page.locator('nav').getByRole('link', { name: navLabel }).click()
    await expect(page.locator('#navbarNavDropdown')).not.toHaveClass(/\bshow\b/)
  })
}

for (const [route, navLabel] of [['/', 'Home'], ['/webapps', 'Other Web Apps']]) {
  test(`${navLabel} identifies the current page`, async ({ page }) => {
    await page.goto(route)
    if (route !== '/') await page.locator('nav').getByRole('button', { name: 'Portfolio' }).click()
    await expect(page.locator('nav').getByRole('link', { name: navLabel })).toHaveAttribute(
      'aria-current', 'page',
    )
  })
}
