
import { expect } from '@playwright/test';

export class DocumentTypePage{
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

    this.TypeLink = page.getByRole('link').filter({
      hasText: 'Типови'
    });

    this.newTypeButton = page.getByRole('button', {
      name: 'Нови тип документа'
    });

    this.TypeNameInput = page.getByRole('textbox', {
      name: 'Назив*'
    });
    this.Dodaj = page.getByRole('button', { name: 'Додај' })


    this.saveButton = page.getByRole('button', {
      name: 'Сачувај'
    });
    this.deleteButton = page.getByText('Обриши');
  }

  async openType() {
    await expect(this.welcomeMessage).toBeVisible({
      timeout: 30000
    });

    await this.navigationButton.click();

    await this.administrationMenu.click();

    await expect(this.TypeLink.first()).toBeVisible({
      timeout: 15000
    });

    await this.TypeLink.first().click();

    await expect(this.page).toHaveURL(/\/types\/?$/, {
      timeout: 15000
    });
  }

  async createType(TypeName) {
    await this.newTypeButton.click();
    await this.TypeNameInput.fill(TypeName);
    await this.page.getByRole('combobox', { name: 'Група' }).click();
    await this.page.getByRole('option', { name: 'Opšta' }).click();
    await this.page.getByRole('textbox', { name: 'Архивска категорија' }).click();
    await this.page.getByRole('cell', { name: 'Акта у вези са достављањем елемената за израду наређења, нацрти наређења из надл' }).click();
    await this.saveButton.click();
  }

  async deleteType() {
    await this.deleteButton.click();
    await this.deleteButton.nth(0).click();
  }
}
