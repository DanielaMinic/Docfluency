
import { test } from '@playwright/test';
import PomManager from '../pages/PomManager.js';

test('Login with valid credentials', async ({ page }) => {
    test.setTimeout(60000);

    const pm = new PomManager(page);

    await pm.loginPage.navigate();

    await pm.loginPage.login(
        process.env.DOCFLUENCE_USERNAME || 'little',
        process.env.DOCFLUENCE_PASSWORD || 'lemur'
    );

    await pm.loginPage.assertLoggedInMessage(
        'Добродошли у систем за управљање документима'
    );
});
