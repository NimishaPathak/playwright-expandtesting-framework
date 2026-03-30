import { test, expect } from '@playwright/test';

test('Get my IP address', async ({ request }) => {
    const response = await request.get('/api/my-ip/');
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.ip).toBeDefined();
    expect(responseBody.city).toBeDefined();
    expect(responseBody.country).toBeDefined();
});