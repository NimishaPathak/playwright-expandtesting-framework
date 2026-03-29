import { test, expect } from '@playwright/test';

test.describe('Rest APIs', () => {
    test('Health check API - Successful Request', async ({ request }) => {
        const response = await request.get('/notes/api/health-check');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.success).toBe(true);
        expect(body.message).toBe('Notes API is Running');
    });
});