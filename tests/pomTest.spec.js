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
    test('Make and delete role', async() => {
        await pm.loginPage.navigate();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.goToRolePage();
        await pm.rolePage.newRole();
        await pm.rolePage.nameRole('Korisnik');
        await pm.rolePage.makeRole();
        await pm.rolePage.deleteRole();
    })
    test.only('Make and delete sequence', async() => {
        await pm.loginPage.navigate();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.goToSequencePage();
        await pm.sequencePage.newSequence();
        await pm.sequencePage.enterSequence('brSocijalnazastita');
        await pm.sequencePage.enterName('Socijalna zastita');
        await pm.sequencePage.selectTemplate();
        await pm.sequencePage.chooseTemplate();
        await pm.sequencePage.makeSequence();
        await pm.sequencePage.deleteSequence();
    })
})