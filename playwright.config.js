import { defineConfig } from '@playwright/test';
import { getEnv } from './configs/envConfig.js';

const env = getEnv();

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 1,
    use: {
        baseURL: env.baseURL,
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        serviceWorkers: 'block',  // blocks service workers
    },
    reporter: [
        ['list'],
        ['html']
    ],
    fullyParallel: true
})