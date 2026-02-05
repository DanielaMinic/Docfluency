import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager';
import {describe} from 'node:test';

let pm;

test.describe('Login Tests', () => {
    test.beforeEach(async ({page}) => {
        pm = new PomManager(page);
    })
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test('Login with valid credentials', async () => {
        await pm.loginPage.navigate();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Welcome to the Digital Archive!');
    })
    test('Login with invalid credentials', async() => {
        await pm.loginPage.navigate();
        await pm.loginPage.login('invalid', 'lemur');
        await pm.loginPage.assertErrorMessage('Invalid username or password.');
    })
    test.only('Make role', async() => {
        await pm.loginPage.navigate();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.goToRolePage();
        await pm.rolePage.newRole();
        await pm.rolePage.nameRole('Korisnik');
        await pm.rolePage.makeRole();
        await pm.rolePage.deleteRole();
    })
})