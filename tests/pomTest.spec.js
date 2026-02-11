import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager';
import {describe} from 'node:test';

let pm;

test.describe.skip('Login Tests', () => {
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
    test('Make and delete type', async() => {
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
})