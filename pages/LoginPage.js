import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.signInButton = page.getByRole('button', {
      name: 'Sign in',
      exact: true
    });

    this.usernameInput = page.getByRole('textbox', {
      name: 'Username or email'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.submitButton = page.getByRole('button', {
      name: 'Sign In',
      exact: true
    });
  }

  async open() {
    await this.page.goto(
      'https://docfluence.softfluency.com/'
    );
  }

  async login(
    username = process.env.DOCFLUENCE_USERNAME || 'little',
    password = process.env.DOCFLUENCE_PASSWORD || 'lemur'
  ) {
    await this.signInButton.click();

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await this.submitButton.click();
  }
  async errormsg(){
    await expect(this.page.getByText('Invalid username or password.')).toBeVisible();
  }
}
