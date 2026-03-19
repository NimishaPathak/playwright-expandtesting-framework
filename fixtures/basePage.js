import { test as base } from '@playwright/test';
import POManager from '../pages/POManager';

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
    },

    POManager: async ({ page }, use) => {
        await use(new POManager(page));
    }
});

export { expect } from '@playwright/test';