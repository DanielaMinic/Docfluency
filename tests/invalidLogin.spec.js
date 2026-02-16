import { test, expect } from '@playwright/test';
import {describe} from 'node:test';

    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Login with invalid credentials', async({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'invalid');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await expect(page.locator('#input-error')).toBeVisible();
    })