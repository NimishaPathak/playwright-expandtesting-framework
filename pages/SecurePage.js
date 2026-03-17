export default class LogOutPage {
    constructor(page) {
        this.page = page;
        this.successMsg = page.getByText('You logged into a secure area!');
        this.logoutLink = page.getByRole('link', { name: ' Logout' })
    }
    async logout() {
        await this.logoutLink.click();
    }
}