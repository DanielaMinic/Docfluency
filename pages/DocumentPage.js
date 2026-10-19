
import { expect } from '@playwright/test';

export class DocumentPage {
  constructor(page) {
    this.page = page;

    this.documentsLink = page.locator(
      'nav.mud-navmenu a[href="/documents"]'
    );

    this.addButton = page.getByRole('button', {
      name: 'Додај'
    });

    this.newDocumentMenuItem = page.getByRole('menuitem', {
      name: 'Нови документ'
    });

    this.nameInput = page.getByRole('textbox', {
      name: 'Назив*'
    });

    this.saveButton = page.getByRole('button', {
      name: 'Сачувај'
    });

    this.actionButton = page.locator(
      'button:has(svg path[d^="M12 8c1.1 0 2-.9"])'
    );
  }

  async open() {
    await expect(this.documentsLink).toBeVisible({
      timeout: 15000
    });

    await this.documentsLink.click();

    await expect(this.page).toHaveURL(
      /\/documents\/?$/,
      { timeout: 15000 }
    );
  }

  async createDocument(documentName) {
    await this.addButton.click();

    await this.newDocumentMenuItem.click();

    await this.nameInput.fill(documentName);

    await expect(this.saveButton).toBeEnabled({
      timeout: 15000
    });

    await this.saveButton.click();

    const documentHeading = this.page.getByRole('heading', {
      name: documentName,
      exact: true
    });

    await expect(documentHeading).toBeVisible({
      timeout: 15000
    });
  }

  async deleteDocument() {
    await expect(this.actionButton.first()).toBeVisible({
      timeout: 10000
    });

    await this.actionButton.first().click();

    const deleteMenuItem = this.page.getByText('Обриши', {
      exact: true
    }).last();

    await expect(deleteMenuItem).toBeVisible();
    await deleteMenuItem.click();

    const confirmDelete = this.page.getByRole('button', {
      name: 'Обриши',
      exact: true
    }).last();

    await expect(confirmDelete).toBeVisible();
    await confirmDelete.click();
  }
}
