
import { expect } from '@playwright/test';

export class RolePage {
  constructor(page) {
    this.page = page;

    this.welcomeMessage = page.getByText(
      'Добродошли у систем за управљање документима',
      { exact: false }
    );

    this.navigationButton = page.getByRole('button').first();

    this.administrationMenu = page.getByText(
      'Администрација Корисника и Приступа'
    );

    this.rolesLink = page.getByRole('link').filter({
      hasText: 'Роле'
    });

    this.newRoleButton = page.getByRole('button', {
      name: 'Нова рола'
    });

    this.roleNameInput = page.getByRole('textbox', {
      name: 'Назив*'
    });

    this.saveButton = page.getByRole('button', {
      name: 'Сачувај'
    });
  }

  async openRoles() {
    await expect(this.welcomeMessage).toBeVisible({
      timeout: 30000
    });

    await this.navigationButton.click();

    await this.administrationMenu.click();

    await expect(this.rolesLink.first()).toBeVisible({
      timeout: 15000
    });

    await this.rolesLink.first().click();

    await expect(this.page).toHaveURL(/\/roles\/?$/, {
      timeout: 15000
    });
  }

  async createRole(roleName) {
    await this.newRoleButton.click();

    await this.roleNameInput.fill(roleName);

    await this.saveButton.click();
  }

  async deleteRole() {
    // Click the delete button for the role
    await this.page.getByRole('button', {
      name: 'Обриши',
      exact: true
    }).first().click();

    // Confirm deletion in the confirmation dialog
    await this.page.getByLabel('Брисање').getByRole('button', {
      name: 'Обриши',
      exact: true
    }).click();
  }
}
