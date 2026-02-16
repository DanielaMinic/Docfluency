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
            await page.click('a[href="sequences"]');
            await page.click('button[title="New Sequence"]');
            await page.fill(':nth-match(input[inputmode="text"], 1)', 'brSocijalnaZastita');
            await page.fill(':nth-match(input[inputmode="text"], 2)', 'Socijalna zastita')
            await page.click(':nth-match(input[inputmode="text"], 3)');
            await page.click('text="Four-digit number (e.g. 0001)"');
            await page.click(':nth-match(button[type="submit"], 2)');
            await page.click('text="Delete"');
            await page.click('text="Delete"');
        })