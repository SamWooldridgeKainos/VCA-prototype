import { test, expect, type TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// List of routes to test
const routes = [
  '/ur/wat/onb/overview',
  '/ur/wat/onb/tasks',
  '/ur/wat/onb/victims'
];

test.describe('Prototype Pages Screenshot Test', () => {
  test.beforeAll(async () => {
    // Create screenshots directory if it doesn't exist
    const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    // Set a consistent viewport size
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  for (const route of routes) {
    test(`Capture screenshot of ${route}`, async ({ page }) => {
      // Navigate to the page
      await page.goto(`http://localhost:3000${route}`);
      
      // Wait for GOV.UK frontend to load
      await page.waitForSelector('.govuk-template', { state: 'visible', timeout: 10000 });
      
      // Wait for any animations to complete
      await page.waitForTimeout(1000);
      
      // Ensure the page is scrolled to top
      await page.evaluate(() => window.scrollTo(0, 0));

      // Open all <details> elements and expand accordions/buttons before screenshot
      await page.evaluate(() => {
        // Open native details elements
        document.querySelectorAll('details').forEach(d => { try { (d as HTMLDetailsElement).open = true; } catch (e) {} });

        // Click any controls that expose aria-expanded attribute to open accordions
        document.querySelectorAll('[aria-expanded="false"]').forEach((el) => {
          try {
            const tag = el.tagName.toLowerCase();
            if (tag === 'button' || tag === 'a') {
              (el as HTMLElement).click();
            } else {
              (el as HTMLElement).setAttribute('aria-expanded', 'true');
            }
          } catch (e) {}
        });
      });

      // Create screenshot filename
      const fileName = route.replace(/\//g, '--').replace(/^--/, '') + '.png';
      
      // Take a screenshot
      await page.screenshot({
        path: path.join(process.cwd(), 'test-results', 'screenshots', fileName),
        fullPage: true
      });

      // Verify GOV.UK elements are present
      await expect(page.locator('.govuk-header')).toBeVisible();
      await expect(page.locator('.govuk-footer')).toBeVisible();
    });
  }

  // Test form interactions
  test('Form interaction test', async ({ page }) => {
    // Start with sign-in page
    await page.goto('http://localhost:3000/ur/wat/onb/sign-in');
    await expect(page.locator('.govuk-header')).toBeVisible();

    // Look for common GOV.UK form elements
    const inputs = await page.locator('.govuk-input').all();
    if (inputs.length > 0) {
      await inputs[0].fill('Test input');
    }

    const buttons = await page.locator('.govuk-button').all();
    if (buttons.length > 0) {
      // Don't actually click the button as it might navigate away
      await expect(buttons[0]).toBeVisible();
    }
  });

  // Test navigation between pages
  test('Navigation test', async ({ page }) => {
    // Test navigation between related pages
    await page.goto('http://localhost:3000/ur/wat/onb/search');
    await expect(page.locator('.govuk-header')).toBeVisible();
    
    // Test back link if present
    const backLink = page.locator('.govuk-back-link');
    if (await backLink.count() > 0) {
      await expect(backLink).toBeVisible();
    }
  });

  // Ensure a full-page screenshot is saved after every test (guarantees full-page for failures and regular runs)
  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    try {
      const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
      const safeTitle = testInfo.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
      const fileName = `${safeTitle}--${Date.now()}.png`;
      await page.screenshot({ path: path.join(screenshotDir, fileName), fullPage: true });
    } catch (e) {
      // ignore screenshot errors
    }
  });
});