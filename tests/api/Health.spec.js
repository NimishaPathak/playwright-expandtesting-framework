import { test, expect } from '@playwright/test';

test.describe('Rest APIs', () => {
    test('Health check API - Successful Request', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/notes/api/health-check`)
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.status).toBe('UP');
        expect(body.success).toBe(true);
        expect(body.message).toBe('API is UP!');
    });
})