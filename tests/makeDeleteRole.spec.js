import { test, expect } from '@playwright/test';
import {describe} from 'node:test';
    test.afterEach(async ({page}) => {
        await page.close();
    })
    test.only('Make and delete role', async({page}) => {
            await page.goto('https://docfluence.softfluency.com/authentication/login/')
            await page.fill('#username', 'little');
            await page.fill('#password', 'lemur');
            await page.click('#kc-login');
            await page.goto('https://docfluence.softfluency.com/roles');
            await page.click('button[title="New role"]');
            await page.fill('input[type="text"]', 'Službenik');
           const errorMessage = page.getByText( 'A role with this name already exists',{ exact: true });
        //await page.getByRole('button', { name: 'Save' }).click();
        //await page.click('text="Delete"');
        //await page.click('text="Delete"');
    })