import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager';
import {describe} from 'node:test';
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Login with valid credentials', async ({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'little');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await expect(page.locator('.align-start.d-flex.flex-grow-1.gap-4.mud-elevation-0.mud-paper.py-2 > .mud-typography.mud-typography-h4')).toBeVisible();
    })