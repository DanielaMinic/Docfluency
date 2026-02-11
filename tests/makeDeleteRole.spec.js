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
    test('Make and delete role', async() => {
            await pm.loginPage.navigate();
            await pm.loginPage.login('little', 'lemur');
            await pm.resultPage.goToRolePage();
            await pm.rolePage.newRole();
            await pm.rolePage.nameRole('Korisnik');
            await pm.rolePage.makeRole();
            await pm.rolePage.deleteRole();
    })