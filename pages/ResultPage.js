import { expect } from '@playwright/test';

export class ResultPage {
    constructor(page) {
        this.page = page;

        // Actual welcome heading shown by Docfluence
        this.welcomeMessage = page.getByRole('heading', {
            name: 'Добродошли у систем за управљање документима',
            exact: true
        });
    }

    async getMessage() {
        await expect(this.welcomeMessage).toBeVisible({
            timeout: 30000
        });

        return await this.welcomeMessage.textContent();
    }

    async assertLoggedInMessage(expectedMessage) {
        const message = await this.getMessage();
        expect(message).toContain(expectedMessage);
    }

    async goToRolePage() {
        const rolesLink = this.page.locator(
            'a[href="/roles"]:visible'
        ).first();

        await expect(rolesLink).toBeVisible({ timeout: 15000 });
        await rolesLink.click();

        await expect(this.page).toHaveURL(/\/roles\/?/, {
            timeout: 15000
        });
    }

    async goToDocumentPage() {
        const documentsLink = this.page.locator(
            'a[href="/documents"]:visible'
        ).first();

        await expect(documentsLink).toBeVisible({ timeout: 15000 });
        await documentsLink.click();

        await expect(this.page).toHaveURL(/\/documents\/?/, {
            timeout: 15000
        });
    }

    async goToTypePage() {
        // The uploaded snapshot does not expose the Types link URL.
        // Print visible navigation links to identify the correct route.
        const navigationLinks = await this.page
            .locator('a.mud-nav-link')
            .evaluateAll(links =>
                links
                    .filter(link => link.getClientRects().length > 0)
                    .map(link => ({
                        text: link.innerText.trim(),
                        href: link.getAttribute('href')
                    }))
            );

        console.log('Visible navigation links:', navigationLinks);

        const typeLink = this.page.locator(
            'a[href="/types"]:visible'
        ).first();

        await expect(typeLink).toBeVisible({ timeout: 15000 });
        await typeLink.click();

        await expect(this.page).toHaveURL(/\/types(?:[/?#]|$)/, {
            timeout: 15000
        });
    }
}
