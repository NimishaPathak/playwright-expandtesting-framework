export default class LandingPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/');
    }
}