import { test, expect } from '@playwright/test';
import NavigationComponent from '../../pages/Components/NavigationComponent';
import LoginPage from '../../pages/LoginPage';
import LandingPage from '../../pages/landingPage';
import SecurePage from '../../pages/SecurePage';
import testData from '../../test-data/users.json' assert {type: 'json'}

test('Scenario 1: Valid login', async ({ page }) => {
    const navigation = new NavigationComponent(page);
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const securePage = new SecurePage(page);

    await landingPage.goto();
    await navigation.openScenario('Test Login Page');
    await expect(loginPage.loginPageHeading).toBeVisible();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/\/secure/);
    await expect(securePage.successMsg).toBeVisible();
    await expect(securePage.logoutLink).toBeVisible();
    await page.pause();
})