import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route('**/*', (route) => {
            const blockedDomains = [
                'googlesyndication.com',
                'doubleclick.net',
                'google-analytics.com',
                'googletagmanager.com',
                'adservice.google.com'
            ];
            const url = route.request().url();
            if (blockedDomains.some(domain => url.includes(domain))) {
                route.abort();
            } else {
                route.continue();
            }
        });
        await use(page);
    }
});

export { expect } from '@playwright/test';