
import { test, expect } from '@playwright/test';

test('Create Organization Unit', async ({ page }) => {
    await page.goto('https://docfluence.softfluency.com/authentication/login/');
    await page.locator('#username').fill('little');
    await page.locator('#password').fill('lemur');
    await page.locator('#kc-login').click();
    await expect(page.getByText('Добродошли у систем за управљање документима',{ exact: false })).toBeVisible({ timeout: 30000 });
    await page.getByRole('button').first().click();
    await page.getByText('Администрација Система').click();
    await page.getByRole('link').filter({ hasText: 'Организациона структура' }).click();
    await page.locator('.mud-paper.mud-elevation-0').first().hover();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await page.getByRole('textbox', { name: 'Назив организационе јединице*' }).fill('NazivTestDMA');
    await page.getByRole('textbox', { name: 'Ознака организационе јединице' }).fill('1234');
    await page.getByRole('textbox', { name: 'Хијерархијска oзнака' }).fill('1234');
    await page.getByRole('button', { name: 'Сачувај' }).click();
    // const container = page.getByText('NazivTestDMA');
    // await container.hover();
    // const binButton = container.locator('button, div, span').filter({has: page.locator('path[d*="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"]')});
    // await binButton.click();
    // await page.getByRole('button', { name: 'Обриши' }).click();
});
