
import { expect } from '@playwright/test';

export class DelovodniPage {
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

    this.DelovodniLink = page.getByRole('link').filter({
      hasText: 'Деловодни'
    });

    this.newDelovodniButton = page.getByRole('button', {
      name: 'Нови деловодни број'
    });

    this.DelovodniNameInput = page.getByRole('textbox', {
      name: 'Назив*'
    });
    this.Dodaj = page.getByRole('button', { name: 'Додај' })


    this.saveButton = page.getByRole('button', {
      name: 'Сачувај'
    });
    this.deleteButton = page.getByText('Обриши');
  }

  async openDelovodni() {
    await expect(this.welcomeMessage).toBeVisible({
      timeout: 30000
    });

    await this.navigationButton.click();

    await this.administrationMenu.click();

    await expect(this.DelovodniLink.first()).toBeVisible({
      timeout: 15000
    });

    await this.DelovodniLink.first().click();

    await expect(this.page).toHaveURL(/\/sequences\/?$/, {
      timeout: 15000
    });
  }

  async createDelovodni(DelovodniName) {
    await this.newDelovodniButton.click();
    await this.DelovodniNameInput.fill(DelovodniName);
    await this.Dodaj.click();
    await this.page.getByRole('menuitem', { name: 'Бројач' }).click();
    await this.saveButton.nth(0).click();
    await this.Dodaj.click();
    await this.page.getByRole('menuitem', { name: 'Oрганизациона јединица' }).click();
    await this.page.getByRole('combobox', { name: 'Oрганизациона јединица*' }).click();
    await this.page.getByRole('option', { name: 'Министар одбране' }).click();
    await this.saveButton.nth(0).click();
    await this.Dodaj.click();
    await this.page.getByRole('menuitem', { name: 'Година' }).click();
    await this.saveButton.nth(0).click();
    await this.Dodaj.click();
    await this.page.getByRole('menuitem', { name: 'Фиксни текст' }).click();
    await this.page.getByRole('textbox', { name: 'Вредност*' }).fill('A');
    await this.saveButton.nth(0).click();
    await this.saveButton.click();
  }

  async deleteDelovodni() {
    await this.deleteButton.click();
    await this.deleteButton.nth(0).click();
  }
}
