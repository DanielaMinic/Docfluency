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
    test.skip('Make and delete type', async() => {
            await pm.loginPage.navigate();
            await pm.loginPage.login('little', 'lemur');
            await pm.resultPage.goToTypePage();
            await pm.typePage.newType();
            await pm.typePage.selectGroup();
            await pm.typePage.enterName('Novi tip');
            await pm.typePage.enterJoint('Novi tip');
            await pm.typePage.enterIndex('novi_tip');
            await pm.typePage.makeType();
            await pm.typePage.deleteType();
        })