import { test, expect } from '@playwright/test';
const validUserDetails = {
    name: "test_user",
    email: `user_${Date.now()}@test.com`,
    password: "Test@123"
};
const loginDetails = {
    email: validUserDetails.email,
    password: validUserDetails.password
};
let token, userID;
let noteId;

test.describe('Notes API', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ request }) => {
        // API request return raw HTTP response object. not the data itself.
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

    test('Create note', async ({ request }) => {
        const createNoteResponse = await request.post('/notes/api/notes', {
            form: {
                "title": "Test Note",
                "description": "This is a test note",
                "category": "Work"
            },
            headers: {
                "x-auth-token": token
            }
        });
        const createNoteResponseBody = await createNoteResponse.json();
        expect(createNoteResponse.status()).toBe(200);
        expect(createNoteResponseBody.success).toBe(true);
        expect(createNoteResponseBody.message).toBe('Note successfully created');
        noteId = createNoteResponseBody.data.id;
    });
    test('Get all notes', async ({ request }) => {
        const getAllNotesResponse = await request.get('/notes/api/notes', {
            headers: {
                "x-auth-token": token
            }
        });
        const getAllNotesResponseBody = await getAllNotesResponse.json();
        expect(getAllNotesResponse.status()).toBe(200);
        expect(getAllNotesResponseBody.success).toBe(true);
        expect(getAllNotesResponseBody.message).toBe('Notes successfully retrieved');
    });
    test('Get note by id', async ({ request }) => {
        const getNoteByIDResponse = await request.get(`/notes/api/notes/${noteId}`, {
            headers: {
                "x-auth-token": token
            }
        });
        const getNoteByIDResponseBody = await getNoteByIDResponse.json();
        expect(getNoteByIDResponse.status()).toBe(200);
        expect(getNoteByIDResponseBody.success).toBe(true);
        expect(getNoteByIDResponseBody.message).toBe('Note successfully retrieved');
    });

    test('Update note', async ({ request }) => {
        const updateExistingNoteWithAllNewValuesRes = await request.put(`/notes/api/notes/${noteId}`, {
            headers: {
                "x-auth-token": token
            },
            form: {
                "title": "Updated Whole Note",
                "description": "This is an updated Whole note",
                "completed": "true",
                "category": "Personal"
            }
        });
        const updateExistingNoteWithAllNewValuesResBody = await updateExistingNoteWithAllNewValuesRes.json();
        expect(updateExistingNoteWithAllNewValuesRes.status()).toBe(200);
        expect(updateExistingNoteWithAllNewValuesResBody.success).toBe(true);
        expect(updateExistingNoteWithAllNewValuesResBody.message).toBe('Note successfully Updated');
    });

    test('Update single field of existing note', async ({ request }) => {
        const updateSingleValueOfNoteRes = await request.patch(`/notes/api/notes/${noteId}`, {
            headers: {
                "x-auth-token": token
            },
            form: {
                "completed": "false"
            }
        });
        const updateSingleValueOfNoteResBody = await updateSingleValueOfNoteRes.json();
        expect(updateSingleValueOfNoteRes.status()).toBe(200);
        expect(updateSingleValueOfNoteResBody.success).toBe(true);
        expect(updateSingleValueOfNoteResBody.message).toBe('Note successfully Updated');
    });

    test('Delete note', async ({ request }) => {
        const deleteNoteResponse = await request.delete(`/notes/api/notes/${noteId}`, {
            headers: {
                "x-auth-token": token
            }
        });
        const deleteNoteResponseBody = await deleteNoteResponse.json();
        expect(deleteNoteResponse.status()).toBe(200);
        expect(deleteNoteResponseBody.success).toBe(true);
        expect(deleteNoteResponseBody.message).toBe('Note successfully deleted');
    });
});