
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DocumentPage } from '../pages/DocumentPage.js';

test('Kreiranje i brisanje dokumenta', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const documentPage = new DocumentPage(page);

  // 1. Login
  await loginPage.open();
  await loginPage.login();

  // 2. Open Documents
  await documentPage.open();

  // 3. Generate a unique document name
  const documentName = `Test_playwright_${Date.now()}`;

  // 4. Create document
  await documentPage.createDocument(documentName);

  // 5. Delete document
  await documentPage.deleteDocument();

  console.log(
    `Dokument ${documentName} je kreiran i obrisan.`
  );
});
