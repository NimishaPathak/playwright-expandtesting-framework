import { test, expect } from '../../fixtures/basePage';
import testData from '../../test-data/users.json' with {type: 'json'};

test.describe('Login test suite', () => {
    test.beforeEach(async ({ POManager }) => {
        const { landingPage, navigation, loginPage } = POManager;
        await landingPage.goto();
        await navigation.openScenario('Test Login Page');
        await expect(loginPage.loginPageHeading).toBeVisible();
    });

    test('Test Case 1: Successful Login', async ({ POManager, page }) => {
        const { loginPage, securePage } = POManager;
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/\/secure/);
        await expect(securePage.successMsg).toBeVisible();
        await expect(securePage.logoutLink).toBeVisible();
    });

    test('Test Case 2: Invalid Username', async ({ POManager }) => {
        const { loginPage } = POManager;
        await loginPage.login(testData.invalidUser.username, testData.validUser.password);
        await expect(loginPage.invalidUserErrorMsg).toHaveText('Your username is invalid!')
        await expect(loginPage.loginPageHeading).toBeVisible();
    });

    test('Test Case 3: Invalid Password', async ({ POManager }) => {
        const { loginPage } = POManager;
        await loginPage.login(testData.validUser.username, testData.invalidUser.password);
        await expect(loginPage.invalidUserErrorMsg).toHaveText('Your password is invalid!')
        await expect(loginPage.loginPageHeading).toBeVisible();
    });

    test('Test Case 4: Empty Username and Password', async ({ POManager }) => {
        const { loginPage } = POManager;
        await loginPage.login('', '');
        await expect(loginPage.invalidUserErrorMsg).toHaveText('Your username is invalid!')
        await expect(loginPage.loginPageHeading).toBeVisible();
    });
});