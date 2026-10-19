import { test, expect } from '@playwright/test';
import {describe} from 'node:test';
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Make and delete sequence', async({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'little');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await page.goto('https://docfluence.softfluency.com/sequences')
             // Find Administration using its SVG icon
  const administration = page.locator(
    'button:has(svg path[d^="M19.14,12.94"])'
  );

  // Verify that exactly one Administration button exists
  console.log(
    'Administration dugme:',
    await administration.count()
  );

  await expect(administration).toHaveCount(1);

  // Expand Administration if it is collapsed
  if (await administration.getAttribute('aria-expanded') !== 'true') {
    await administration.click();
  }
            await page.click('button[title="New Sequence"]');
            await page.fill(':nth-match(input[inputmode="text"], 1)', 'NoviBroj');
            await page.click('text="Add"');
            await page.click('text="Counter"');
            await page.click('text="Save"');
            await page.click('text="Add"');
            await page.click('text="Organization unit"');
            await page.getByRole('combobox', { name: 'Organization unit*' }).click();
            await page.getByRole('option', { name: 'Министар одбране' }).click();
            await page.click('text="Save"');
            await page.click('text="Add"');
            await page.click('text="Year"');
            await page.click('text="Save"');
            await page.click('text="Add"');
            await page.click('text="Fixed text"');
            await page.getByRole('textbox', { name: 'Value*' }).fill('A');
            await page.click('text="Save"');
            await page.click('text="Save"');
            await page.click('text="Delete"');
            await page.click('text="Delete"');
        })