import { test, expect } from '@playwright/test';
import {describe} from 'node:test';
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Make and delete document', async({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'little');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await page.click('a[href="documents"]');
            await page.click('a[title="New document"]');
            await page.fill(':nth-match(input[inputmode="text"], 1)', 'Dokument');
            await page.click(':nth-match(input[inputmode="text"], 2)');
            await page.click('text="8"');
            await page.fill('textarea[inputmode="text"]', 'Tekst dokument');
            await page.locator('input[type="file"]').setInputFiles('slika.png');
            await page.click('text="Save"');
            await page.click('text="Delete"');
            await page.click('text="Delete"');
        })