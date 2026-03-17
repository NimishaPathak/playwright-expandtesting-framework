export default class NavigationComponent {
    constructor(page) {
        this.page = page;
        this.home = page.locator('#home');
    }

    async openScenario(name) {
        await this.page
            .locator("#examples .card", { hasText: name })
            .getByRole('link', { name: 'Try it out' }).click();
    }
}