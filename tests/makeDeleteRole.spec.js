import { test, expect } from '@playwright/test';
import {describe} from 'node:test';
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Make and delete role', async({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'little');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await page.click('a[href="roles"]');
            await page.click('button[title="New role"]');
            await page.fill('input[type="text"]', 'Korisnik');
            await page.click(':nth-match(button[type="submit"], 2)');
            await page.click('text="Delete"');
            await page.click('text="Delete"');
    })