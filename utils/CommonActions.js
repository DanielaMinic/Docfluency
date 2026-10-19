
export default class CommonActions {
  constructor(page) {
    this.page = page;
  }

  async click(selector) {
    const locator = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;

    await locator.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await locator.click({
      timeout: 10000
    });
  }

  async fill(selector, text) {
    const locator = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;

    await locator.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await locator.fill(String(text), {
      timeout: 10000
    });
  }

  async getText(selector) {
    const locator = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;

    await locator.waitFor({
      state: 'visible',
      timeout: 10000
    });

    return await locator.innerText();
  }

  async isVisible(selector) {
    const locator = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;

    return await locator.isVisible();
  }
}
