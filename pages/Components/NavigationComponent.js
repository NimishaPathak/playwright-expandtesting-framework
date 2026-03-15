export default class NavigationComponent {
    constructor(page) {
        this.page = page;
        this.home = page.locator('#home');
        this.logout = page.locator('#logout');
    }

    async goHome() {
        await this.home.click();
    }

    async logout() {
        await this.logout.click();
    }

    async openScenario(name) {
        await this.page
            .locator("examples .card", { hasText: name })
            .getByRole('link', { name: 'Try it out' }).click();
    }
}