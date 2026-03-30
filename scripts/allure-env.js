import { writeFileSync, existsSync, mkdirSync } from 'fs';

if (!existsSync('allure-results')) {
    mkdirSync('allure-results');
}

const env = `BASE_URL=https://practice.expandtesting.com
Browser=Chromium
Platform=Windows
Node=${process.version}
Framework=Playwright
`;

writeFileSync('allure-results/environment.properties', env);