import db from '../config/db.js';

const getAll = async (tableName) => {
    const [rows] = await db.query(`SELECT * FROM ${tableName}`);
    return rows;
};

const getById = async (tableName, id) => {
    const [rows] = await db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return rows[0];
};
const getUserPassword = async (id) => {
    const [rows] = await db.query(`SELECT password FROM passwords WHERE userId = ?`, [id]);
    console.log("trying...",id, rows[0]);
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

const update = async (tableName, id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await db.query(
        `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
        [...values, id]
    );
    return await getById(tableName, id);
};

const remove = async (tableName, id) => {
    const [result] = await db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    return result.affectedRows;
};
export default { getAll, getById, getUserPassword, getByColumn, create, update, remove };