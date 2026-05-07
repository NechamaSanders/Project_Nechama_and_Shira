require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../config/db'); 

const initializeDatabase = async () => {
    try {
        const sqlPath = path.join(__dirname, '..', 'sql', 'schema.sql');
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