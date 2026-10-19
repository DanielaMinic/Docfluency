
import { expect } from '@playwright/test';

export class OrgPage{
  constructor(page) {
    this.page = page;

    this.welcomeMessage = page.getByText(
      'Добродошли у систем за управљање документима',
      { exact: false }
    );

    this.navigationButton = page.getByRole('button').first();

    this.administrationMenu = page.getByText(
      'Администрација Система'
    );

    this.OrgLink = page.getByRole('link').filter({
      hasText: 'Организациона'
    });

    this.saveButton = page.getByRole('button', {
      name: 'Сачувај'
    });
    this.deleteButton = page.getByText('Обриши');
  }

  async openOrg() {
    await expect(this.welcomeMessage).toBeVisible({
      timeout: 30000
    });

    await this.navigationButton.click();

    await this.administrationMenu.click();

    await expect(this.OrgLink.first()).toBeVisible({
      timeout: 15000
    });

    await this.OrgLink.first().click();

    await expect(this.page).toHaveURL(/\/org-structure\/?$/, {
      timeout: 15000
    });
  }

  async createdeleteOrg() {
    await this.page.locator('.mud-paper.mud-elevation-0').first().hover();
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await this.page.getByRole('textbox', { name: 'Назив организационе јединице*' }).fill('Naziv');
    await this.page.getByRole('textbox', { name: 'Ознака организационе јединице' }).fill('1234');
    await this.page.getByRole('textbox', { name: 'Хијерархијска oзнака' }).fill('4321');
    await this.saveButton.click();
    await this.page.getByText('Хијерархијска ознака: 4321').hover();
    await this.page.locator('li:nth-child(18) > .mud-treeview-item-content > .mud-paper > .d-flex.flex-row.gap-1.tree-actions > button:nth-child(2)').click();
    await this.page.getByRole('button', { name: 'Обриши' }).click();
  }
}
