import { test, expect } from '@playwright/test';
let token, userID;
let newPassword = "Test@1234";
const validUserDetails = {
    name: "test_user",
    email: `user_${Date.now()}@test.com`,
    password: "Test@123"
};

const invalidUserDetails = {
    name: "test_user",
    email: "test",
    password: "Test@123"
};

const loginDetails = {
    email: validUserDetails.email,
    password: validUserDetails.password
};
test.describe('Users APIs', () => {
    test.describe.configure({ mode: "serial" });
    test.beforeAll(async ({ request }) => {
        const registeredUserResponse = await request.post('/notes/api/users/register', {
            // Form data
            form: validUserDetails
        });
        const registeredUserResponseBody = await registeredUserResponse.json();
        expect(registeredUserResponse.status()).toBe(201);
        expect(registeredUserResponseBody.success).toBe(true);
        expect(registeredUserResponseBody.message).toBe('User account created successfully');

        const loginResponse = await request.post('/notes/api/users/login', {
            // Form data
            form: loginDetails
        });
        const loginResponseBody = await loginResponse.json();
        expect(loginResponse.status()).toBe(200);
        expect(loginResponseBody.success).toBe(true);
        expect(loginResponseBody.message).toBe('Login successful');
        token = loginResponseBody.data.token;
        userID = loginResponseBody.data.id;
    });

    test('Register User API - Bad Request', async ({ request }) => {
        const response = await request.post('/notes/api/users/register', {
            form: invalidUserDetails
        });
        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body.success).toBe(false);
        expect(body.message).toBe('A valid email address is required');
    });

    test('Get user profile', async ({ request }) => {
        const response = await request.get('/notes/api/users/profile', {
            headers: {
                "x-auth-token": token
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.success).toBe(true);
        expect(body.message).toBe('Profile successful');
    });
    test('Update user profile', async ({ request }) => {
        const response = await request.patch('/notes/api/users/profile', {
            form: {
                "id": userID,
                "name": "updated_user",
                "email": `updated_user_${Date.now()}@test.com`,
                "password": "Test@123"
            },
            headers: {
                "x-auth-token": token
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.success).toBe(true);
        expect(body.message).toBe("Profile updated successful");
    });

    test('Change Password', async ({ request }) => {
        const response = await request.post('/notes/api/users/change-password', {
            form: {
                "currentPassword": "Test@123",
                "newPassword": newPassword
            },
            headers: {
                "x-auth-token": token
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.success).toBe(true);
        expect(body.message).toBe("The password was successfully updated");
    });

    test('Logout a user', async ({ request }) => {
        const response = await request.delete('/notes/api/users/logout', {
            headers: {
                "x-auth-token": token
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.success).toBe(true);
        expect(body.message).toBe("User has been successfully logged out");
    });

    test('Delete user account', async ({ request }) => {
        // 1. Login again to get fresh token
        const loginResponse = await request.post('/notes/api/users/login', {
            // Form data
            form: {
                "email": validUserDetails.email,
                "password": newPassword
            }
        });
        const loginResponseBody = await loginResponse.json();

        // 2.Delete account
        const response = await request.delete('/notes/api/users/delete-account', {
            headers: {
                "x-auth-token": loginResponseBody.data.token
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.success).toBe(true);
        expect(body.message).toBe("Account successfully deleted");
    });
});