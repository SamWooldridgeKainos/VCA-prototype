import { test, expect, type TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// List of routes to test
const routes = [
  '/v50/tasks',
  '/v50/victims'
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
    // Start with tasks page
    await page.goto('http://localhost:3000/v42/onb/tasks');
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

  const meetingScenarios: {
    name: string;
    state: string;
    data: Record<string, string>;
    expected: string[];
  }[] = [
    {
      name: 'offered',
      state: 'offered',
      data: { meetingOfferMethod: 'By telephone', meetingOfferDate: '02/10/2026' },
      expected: ['By telephone', '2 October 2026']
    },
    {
      name: 'accepted',
      state: 'accepted',
      data: {
        meetingAcceptedMethod: 'By telephone', meetingAcceptedDate: '03/10/2026',
        meetingOfferMethod: 'Letter by email', meetingOfferDate: '02/10/2026'
      },
      expected: ['By telephone', 'Letter by email', '2 October 2026', '3 October 2026']
    },
    {
      name: 'declined',
      state: 'declined',
      data: {
        meetingDeclinedMethod: 'By telephone', meetingDeclinedDate: '03/10/2026',
        meetingOfferMethod: 'Letter by email', meetingOfferDate: '02/10/2026'
      },
      expected: ['By telephone', 'Letter by email', '2 October 2026', '3 October 2026']
    },
    {
      name: 'no response',
      state: 'no-response',
      data: { meetingOfferMethod: 'Letter by email', meetingOfferDate: '02/10/2026' },
      expected: ['Letter by email', '2 October 2026']
    },
    {
      name: 'not offered',
      state: 'not-offered',
      data: { meetingNotOfferedReason: 'Distinct reason entered for this test' },
      expected: ['Distinct reason entered for this test']
    },
    {
      name: 'arranged',
      state: 'arranged',
      data: {
        meetingDate: '02/10/2026', meetingHour: '09', meetingMinutes: '30',
        meetingFormat: 'hybrid', meetingLocationType: 'other', otherLocation: 'Test Venue',
        meetingRequestedBy: 'family', meetingLead: 'Test Lead', attendees: 'Test Attendee',
        interpreterNeeded: 'yes', interpreterDetails: 'Test interpreter',
        supportPersonNeeded: 'yes', supportPersonDetails: 'Test companion',
        otherSupportNeeds: 'Test support', meetingAcceptedMethod: 'By telephone',
        meetingAcceptedDate: '03/10/2026', meetingOfferMethod: 'Letter by email',
        meetingOfferDate: '02/10/2026'
      },
      expected: ['2 October 2026', 'Hybrid', 'Test Venue', 'Test Lead', 'Test Attendee', 'Test interpreter', 'Test companion', 'By telephone', 'Letter by email']
    },
    {
      name: 'outcome logged',
      state: 'outcome',
      data: {
        meetingDate: '02/10/2026', meetingHour: '09', meetingMinutes: '30',
        meetingFormat: 'virtual', meetingLocationType: 'other', otherLocation: 'Test Room',
        meetingLead: 'Test Lead', attendees: 'Test Attendee', logDurationHours: '1',
        logDurationMinutes: '15', logAttended: 'Test Attendee', logCounselAttended: 'no',
        logEligibleExpenses: 'no', logAgreedResearch: 'not-asked', logNotesInCms: 'no',
        logNotesToOic: 'no', logNotesToVictim: 'no', actionsAgreed2: 'yes',
        moreDetail: 'Test action', interpreterNeeded: 'yes', interpreterDetails: 'Test interpreter',
        supportPersonNeeded: 'yes', supportPersonDetails: 'Test support'
      },
      expected: ['2 October 2026', '09:30', 'Virtual call', 'Test Room', 'Test Lead', 'Test Attendee', 'Test action', 'Test interpreter', 'Test support']
    },
    {
      name: 'outcome not held',
      state: 'outcome-no',
      data: {
        meetingNotHappenReason: 'other', meetingNotHappenReasonOther: 'Test absence',
        meetingDate: '02/10/2026', meetingHour: '09', meetingMinutes: '30',
        meetingFormat: 'virtual', meetingLocationType: 'other', otherLocation: 'Test Venue',
        meetingLead: 'Test Lead', attendees: 'Test Attendee', interpreterNeeded: 'no',
        supportPersonNeeded: 'yes', supportPersonDetails: 'Test companion', otherSupportNeeds: 'Test support'
      },
      expected: ['Test absence', '2 October 2026', 'Virtual call', 'Test Venue', 'Test Lead', 'Test Attendee', 'Test companion', 'Test support']
    },
    {
      name: 'cancelled',
      state: 'cancelled',
      data: {
        meetingCancelledDate: '02/10/2026', meetingCancelledHour: '09',
        meetingCancelledMinutes: '30', meetingCancelReason: 'other',
        meetingCancelReasonOther: 'Test cancellation', meetingDate: '01/10/2026',
        meetingFormat: 'virtual', meetingLocationType: 'other', otherLocation: 'Test Venue',
        meetingLead: 'Test Lead', attendees: 'Test Attendee', interpreterNeeded: 'no',
        supportPersonNeeded: 'no', otherSupportNeeds: 'None'
      },
      expected: ['2 October 2026', '09:30', 'Test cancellation', '1 October 2026', 'Virtual call', 'Test Venue', 'Test Lead', 'Test Attendee']
    },
    {
      name: 'rescheduled',
      state: 'rescheduled',
      data: {
        meetingDate: '05/10/2026', meetingHour: '13', meetingMinutes: '45',
        meetingRescheduleReason: 'other', meetingRescheduleReasonOther: 'Test reschedule',
        meetingFormat: 'virtual', meetingLocationType: 'other', otherLocation: 'Test Venue',
        meetingLead: 'Test Lead', attendees: 'Test Attendee', interpreterNeeded: 'yes',
        interpreterDetails: 'New interpreter', supportPersonNeeded: 'no',
        otherSupportNeeds: '', previousMeetingDate: '02/10/2026', previousMeetingHour: '09',
        previousMeetingMinutes: '30', previousMeetingFormat: 'in-person',
        previousMeetingLocationType: 'other', previousOtherLocation: 'Old Venue',
        previousMeetingLead: 'Old Lead', previousAttendees: 'Old Attendee',
        previousInterpreterNeeded: 'yes', previousInterpreterDetails: 'Old interpreter',
        previousSupportPersonNeeded: 'yes', previousSupportPersonDetails: 'Old support'
      },
      expected: ['5 October 2026', 'Test reschedule', 'New interpreter', '2 October 2026', 'Old interpreter', 'Old support', 'Old Venue', 'Test Venue', 'Test Lead', 'Test Attendee']
    }
  ];

  for (const scenario of meetingScenarios) {
    test(`Meetings sub-tab displays submitted data: ${scenario.name}`, async ({ page }) => {
      const query = new URLSearchParams({
        ...scenario.data,
        secondaryNav: 'ptm',
        meetingState: scenario.state,
        meetingSuccess: 'yes'
      }).toString();
      await page.goto(`http://localhost:3000/v50/meetings-2/victim-record?${query}#communications`);

      const meetingPanel = page.locator('#comms-ptm');
      for (const value of scenario.expected) {
        await expect(meetingPanel).toContainText(value);
      }
      await expect(meetingPanel).not.toContainText('11 April 2025');
      await expect(meetingPanel).not.toContainText('Birmingham Magistrates');
    });
  }

  // Test navigation between pages
  test('Navigation test', async ({ page }) => {
    // Test navigation between related pages
    await page.goto('http://localhost:3000/v42/onb/victims');
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