import { test, expect } from '@playwright/test';
import {describe} from 'node:test';

    test.afterEach(async ({page}) => {
        await page.close();
    })
    test.skip('Make and delete type', async({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'little');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await page.click('a[href="types"]');
            await page.click('button[title="New document type"]');
            await page.click('text="-- No group --"');
            await page.click('text="Opšta"');
            await page.fill(':nth-match(input[inputmode="text"], 2)', 'Novi tip');
            await page.fill(':nth-match(input[inputmode="text"], 3)', 'Novi tip');
            await page.fill(':nth-match(input[inputmode="text"], 4)', 'novi_tip');
            await page.click(':nth-match(button[type="submit"], 2)');
            await page.click('text="Delete"');
            await page.click('text="Delete"');
        })