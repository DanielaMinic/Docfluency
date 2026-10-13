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