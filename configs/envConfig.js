import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

export function getEnv() {
    const envName = process.env.TEST_ENV || 'dev';
    const envPath = path.resolve(`configs/${envName}.env`);

    if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}.env`);

    }

    dotenv.config({
        path: envPath
    })
    return {
        baseURL: process.env.BASE_URL,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }
}