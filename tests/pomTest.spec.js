import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager';
import {describe} from 'node:test';

let pm;

test.describe.only('Login Tests', () => {
    test.beforeEach(async ({page}) => {
        pm = new PomManager(page);
    })
   
    test('Login with valid credentials', async () => {
        await pm.loginPage.open();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Добродошли у систем за управљање документима');
    })
    test('Login with invalid credentials', async() => {
        await pm.loginPage.open();
        await pm.loginPage.login('invalid', 'lemur');
        await pm.loginPage.errormsg();
    })
    test('Make and delete role', async() => {
        await pm.loginPage.open();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Добродошли у систем за управљање документима');
        await pm.rolePage.openRoles();
        await pm.rolePage.createRole('Korisnik');
        await pm.rolePage.deleteRole();
    })
    test.only('Make and delete sequence', async() => {
        await pm.loginPage.open();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Добродошли у систем за управљање документима');
        await pm.sequencePage.openDelovodni();
        await pm.sequencePage.createDelovodni('Novi broj');
        await pm.sequencePage.deleteDelovodni();
    })
    test('Make and delete type', async() => {
        await pm.loginPage.open();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Добродошли у систем за управљање документима');
        await pm.typePage.openType();
        await pm.typePage.createType('Korisnik');
        await pm.typePage.deleteType();
    })
    test('Make and delete document', async() => {
        await pm.loginPage.open();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Добродошли у систем за управљање документима');
        await pm.documentPage.open();
        const documentName = `Test_playwright_${Date.now()}`;
        await pm.documentPage.createDocument(documentName);
        await pm.documentPage.deleteDocument();
    })
    test('Make and delete org unit', async() => {
        await pm.loginPage.open();
        await pm.loginPage.login('little', 'lemur');
        await pm.resultPage.assertLoggedInMessage('Добродошли у систем за управљање документима');
        await pm.orgPage.openOrg();
        await pm.orgPage.createdeleteOrg();
    })
})