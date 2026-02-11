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
    test('Make and delete document', async() => {
            await pm.loginPage.navigate();
            await pm.loginPage.login('little', 'lemur');
            await pm.resultPage.goToDocumentPage();
            await pm.documentPage.newDocument();
            await pm.documentPage.nameDocument('Dokument');
            await pm.documentPage.enterDate();
            await pm.documentPage.enterNote('Test dokument');
            await pm.documentPage.documentInsert('slika.png');
            await pm.documentPage.makeDocument();
            await pm.documentPage.deleteDocument();
        })