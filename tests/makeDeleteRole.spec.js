
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RolePage } from '../pages/RolePage.js';

test('Kreiranje i brisanje role', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const rolePage = new RolePage(page);

  // 1. Login to Docfluence
  await loginPage.open();
  await loginPage.login();

  // 2. Open Roles
  await rolePage.openRoles();

  // 3. Create a role with a unique name
  const roleName = `Službenik_${Date.now()}`;

  await rolePage.createRole(roleName);

  // 4. Verify that the role was created
  await expect(
    page.getByText(roleName, { exact: true })
  ).toBeVisible({ timeout: 15000 });

  // 5. Delete the role
  await rolePage.deleteRole();

  console.log(`Role "${roleName}" was created and deleted.`);
});
