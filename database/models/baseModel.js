const db = require('../config/db');

const getAll = async (tableName) => {
    const [rows] = await db.query(`SELECT * FROM ${tableName}`);
    return rows;
};

const getById = async (tableName, id) => {
    const [rows] = await db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return rows[0];
};

const getByColumn = async (tableName, columnName, value) => {
    const [rows] = await db.query(`SELECT * FROM ${tableName} WHERE ${columnName} = ?`, [value]);
    return rows;
};

const create = async (tableName, data) => {
    const keys = Object.keys(data); 
    const values = Object.values(data); 
    const placeholders = keys.map(() => '?').join(', '); 

    const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    
    const [result] = await db.query(sql, values);
    return result.insertId;
};
module.exports = { getAll, getById, getByColumn, create };