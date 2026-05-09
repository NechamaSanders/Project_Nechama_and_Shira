import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import  path from 'path';
import db from '../config/db.js';

const initializeDatabase = async () => {
    try {
        const sqlPath = path.join(__dirname, '..', '..', '..', 'database', 'schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log("Starting database initialization...");

        const queries = sql.split(';').filter(query => query.trim() !== '');

        for (let query of queries) {
            await db.query(query);
        }

        console.log("Database initialized successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error initializing database:", err.message);
        process.exit(1);
    }
};

initializeDatabase();