import BasePage from './BasePage.js';

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginBtn = page.locator('button[type="submit"]');
    }
    async login(username, password) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginBtn)
    }
}