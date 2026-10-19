
import { test, expect } from '@playwright/test';

test('Make and delete type', async ({ page }) => {
  test.setTimeout(0);

  const typeName = `Novi tip ${Date.now()}`;

    // 1. Login to Docfluence
    await page.goto(
        'https://docfluence.softfluency.com/authentication/login/'
    );

    await page.locator('#username').fill('little');
    await page.locator('#password').fill('lemur');
    await page.locator('#kc-login').click();
    await expect(page.getByText('Добродошли у систем за управљање документима',{ exact: false })).toBeVisible({ timeout: 30000 });

  console.log('Uspešna prijava.');

  // 4. Pronalaženje dugmeta Administracija sistema
  const adminButton = page
    .locator('button.mud-nav-link')
    .filter({
      hasText: 'Администрација Система'
    });

  // Otvori bočni meni ako dugme nije vidljivo
  if (!(await adminButton.isVisible().catch(() => false))) {
    await page.getByRole('button').first().click();
  }

  await expect(adminButton).toBeVisible({ timeout: 15000 });

  // 5. Otvori grupu samo ako je zatvorena
  const expanded = await adminButton.getAttribute('aria-expanded');

  if (expanded !== 'true') {
    await adminButton.click();
  }

  // 6. Otvaranje stranice Tipovi dokumenata
  const typesLink = page.locator('a[href="/types"]');

  await expect(typesLink).toBeVisible({ timeout: 15000 });
  await typesLink.click();

  await expect(page).toHaveURL(/\/types(?:[/?#]|$)/, {
    timeout: 15000
  });

  await expect(
    page.getByRole('heading', {
      name: 'Типови докумената'
    }).last()
  ).toBeVisible({ timeout: 15000 });

  console.log('Otvorena stranica Tipovi dokumenata.');

  // 7. Otvaranje forme za novi tip
  const newTypeButton = page.getByRole('button', {
    name: 'Нови тип документа'
  });

  await expect(newTypeButton).toBeVisible({ timeout: 15000 });
  await newTypeButton.click();

  const dialog = page.locator('.mud-dialog:visible').last();

  await expect(dialog).toBeVisible({ timeout: 10000 });

  // 8. Unos naziva tipa
  await dialog.getByRole('textbox', {
    name: /Назив/
  }).fill(typeName);

  // 9. Izbor kategorije
  const typeSelector = dialog.getByTitle('Тип документа', {
    exact: true
  });

  await typeSelector.getByRole('button').click();

  const category = page.getByRole('cell', {
    name: 'Акта у вези са усаглашавањем детаља ради реализације састанака',
    exact: false
  });

  await expect(category).toBeVisible({ timeout: 10000 });
  await category.click();

  // 10. Čuvanje novog tipa
  const saveButton = dialog.getByRole('button', {
    name: 'Сачувај',
    exact: true
  });

  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  await expect(dialog).toBeHidden({ timeout: 15000 });

  console.log(`Tip dokumenta kreiran: ${typeName}`);

  // 11. Pronalaženje kreiranog tipa
  const createdType = page.getByText(typeName, {
    exact: true
  }).first();

  await expect(createdType).toBeVisible({ timeout: 15000 });

  // 12. Izbor tipa
  await createdType.click();

  // 13. Brisanje izabranog tipa
  const deleteButton = page.getByRole('button', {
    name: 'Обриши',
    exact: true
  }).first();

  await expect(deleteButton).toBeVisible({ timeout: 10000 });
  await expect(deleteButton).toBeEnabled();
  await deleteButton.click();

  // 14. Potvrda brisanja
  const deleteDialog = page.getByRole('dialog', {
    name: 'Брисање'
  });

  await expect(deleteDialog).toBeVisible({ timeout: 10000 });

  await deleteDialog.getByRole('button', {
    name: 'Обриши',
    exact: true
  }).click();

  // 15. Provera brisanja
  await expect(
    page.getByText(typeName, { exact: true })
  ).toHaveCount(0, { timeout: 15000 });

  console.log(`Tip dokumenta obrisan: ${typeName}`);

  // 16. Ostavi browser otvoren na stranici Tipovi dokumenata
  await expect(page).toHaveURL(/\/types(?:[/?#]|$)/);

  console.log('Test je završen. Browser je pauziran.');

  await page.pause();
});
