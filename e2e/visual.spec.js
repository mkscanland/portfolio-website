import { expect, test } from '@playwright/test'

const routes = [
  ['home', '/'],
  ['appraisals', '/appraisals'],
  ['rulesengine', '/rulesengine'],
  ['webapps', '/webapps'],
  ['randomforest', '/randomforest'],
  ['validations', '/validations'],
  ['itsystems', '/itsystems'],
  ['rebuild', '/rebuild'],
  ['annualreports', '/annualreports'],
]

const viewports = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 800, height: 1000 },
  desktop: { width: 1280, height: 900 },
}

// Load lazy images and wait for every image and web font so screenshots are deterministic.
async function settle(page) {
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager'
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true })
              img.addEventListener('error', resolve, { once: true })
            }),
      ),
    )
    await document.fonts.ready
  })
}

for (const [viewportName, viewport] of Object.entries(viewports)) {
  test.describe(`${viewportName} pages`, () => {
    test.use({ viewport })

    for (const [name, path] of routes) {
      test(name, async ({ page }) => {
        await page.goto(path)
        await settle(page)
        await expect(page).toHaveScreenshot(`${name}-${viewportName}.png`, { fullPage: true })
      })
    }
  })
}

test.describe('interactive states', () => {
  test('desktop dropdown opens on hover', async ({ page }) => {
    await page.setViewportSize(viewports.desktop)
    await page.goto('/')
    await settle(page)
    await page.locator('nav').getByText('Portfolio', { exact: true }).hover()
    await expect(page.locator('nav').getByText('Random Forest', { exact: true })).toBeVisible()
    await expect(page).toHaveScreenshot('nav-dropdown-hover-desktop.png')
  })

  test('mobile menu and submenu open', async ({ page }) => {
    await page.setViewportSize(viewports.mobile)
    await page.goto('/')
    await settle(page)
    await page.getByRole('button', { name: 'Toggle navigation' }).click()
    await expect(page.locator('nav').getByText('Home', { exact: true })).toBeVisible()
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('nav-menu-open-mobile.png')
    await page.locator('nav').getByText('Portfolio', { exact: true }).click()
    await expect(page.locator('nav').getByText('Random Forest', { exact: true })).toBeVisible()
    await expect(page).toHaveScreenshot('nav-submenu-open-mobile.png')
  })

  for (const viewportName of ['mobile', 'desktop']) {
    test(`project modal (${viewportName})`, async ({ page }) => {
      await page.setViewportSize(viewports[viewportName])
      await page.goto('/webapps')
      await settle(page)
      await page.locator('#internalRebuild').click()
      await expect(
        page.getByRole('heading', { level: 3, name: 'Internal Website Rebuild' }),
      ).toBeVisible()
      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot(`project-modal-${viewportName}.png`)
    })
  }

  test('project card hover', async ({ page }) => {
    await page.setViewportSize(viewports.desktop)
    await page.goto('/webapps')
    await settle(page)
    const card = page.locator('#checkout')
    await card.hover()
    await expect(card).toHaveScreenshot('project-card-hover-desktop.png')
  })
})
