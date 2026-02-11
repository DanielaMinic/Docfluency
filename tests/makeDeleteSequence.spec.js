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
    test('Make and delete sequence', async() => {
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