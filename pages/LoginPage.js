export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginBtn = page.locator('button[type="submit"]');
        this.loginPageHeading = page.getByRole('heading', { name: 'Test Login page for Automation Testing Practice' });
        this.invalidUserErrorMsg = page.locator('#flash b');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}