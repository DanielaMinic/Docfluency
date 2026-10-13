import { test, expect } from '@playwright/test';
import {describe} from 'node:test';
    test.afterEach(async ({page}) => {
        await page.close();
    })
test('Create and delete a document', async ({ page }) => {
  const documentName = 'Dokument_Playwright_' + Date.now();

  // 1. Open the login page
  await page.goto(
    'https://docfluence.softfluency.com/authentication/login/'
  );

  // 2. Log in
  await page.fill('#username', 'little');
  await page.fill('#password', 'lemur');
  await page.click('#kc-login');

  // 3. Open Documents
  await page.goto('https://docfluence.softfluency.com/documents');

  await expect(
    page.getByRole('button', { name: 'Add' })
  ).toBeVisible({ timeout: 15000 });

  // 4. Click Add
  await page.getByRole('button', { name: 'Add' }).click();

  // 5. Click New document
  await page.getByText('New document', { exact: true }).click();

  // 6. Fill in document name
  const textInputs = page.locator('input[inputmode="text"]');

  await expect(textInputs.first()).toBeVisible({ timeout: 10000 });
  await textInputs.first().fill(documentName);

  // 7. Select document type, if available
  if (await textInputs.count() > 1) {
    await textInputs.nth(1).click();

    const typeOption = page.getByText('8', { exact: true }).last();

    if (await typeOption.isVisible().catch(() => false)) {
      await typeOption.click();
    }
  }

  // 8. Fill document description, if available
  const description = page.locator('textarea[inputmode="text"]');

  if (await description.count() > 0) {
    await description.first().fill(
      'Tekst dokumenta kreiran Playwright testom'
    );
  }

  // 9. Save document
  await page.getByText('Save', { exact: true }).last().click();

  // 10. Verify document creation
  await expect(
    page.getByText(documentName, { exact: true }).first()
  ).toBeVisible({ timeout: 15000 });

  console.log('Document created:', documentName);

  // 11. Find menu buttons
  const menuButtons = page.locator(
    'button.mud-menu-icon-button-activator'
  );

  console.log('Menu buttons found:', await menuButtons.count());

  let deleteFound = false;

  // 12. Inspect each menu
  for (let i = 0; i < await menuButtons.count(); i++) {
    const button = menuButtons.nth(i);

    if (!(await button.isVisible().catch(() => false))) {
      continue;
    }

    await button.click();

    const menuId = await button.getAttribute('aria-controls');

    if (menuId) {
      const menu = page.locator(`[id="${menuId}"]`);

      if (await menu.isVisible().catch(() => false)) {
        const menuText = await menu.innerText();

        console.log(`Menu ${i} text:`, menuText);

        const deleteItem = menu.getByText('Delete', {
          exact: true
        });

        if (await deleteItem.count() > 0) {
          await deleteItem.last().click();
          deleteFound = true;
          break;
        }
      }
    }

    // Close menu before checking the next one
    await page.keyboard.press('Escape');
  }

  // 13. Save diagnostic information if Delete was not found
  if (!deleteFound) {
    await page.screenshot({
      path: 'docfluence-delete-debug.png',
      fullPage: true
    });

    console.log('Delete was not found in the inspected menus.');

    throw new Error(
      'Could not find Delete. Inspect the console output ' +
      'and docfluence-delete-debug.png to identify the correct menu.'
    );
  }

  // 14. Confirm deletion if a dialog appears
  const dialog = page.getByRole('dialog');

  if (await dialog.isVisible().catch(() => false)) {
    const confirmDelete = dialog.getByRole('button', {
      name: 'Delete',
      exact: true
    });

    if (await confirmDelete.count() > 0) {
      await confirmDelete.click();
    }
  }

  // 15. Verify that the document was deleted
  await expect(
    page.getByText(documentName, { exact: true })
  ).toHaveCount(0, { timeout: 15000 });

  console.log('Document deleted:', documentName);
});