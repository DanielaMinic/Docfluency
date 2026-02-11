import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager';
import {describe} from 'node:test';

let pm;
    test.beforeEach(async ({page}) => {
        pm = new PomManager(page);
    })
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Login with invalid credentials', async() => {
            await pm.loginPage.navigate();
            await pm.loginPage.login('invalid', 'lemur');
            await pm.loginPage.assertErrorMessage('Invalid username or password.');
    })