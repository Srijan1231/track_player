import { query } from "../../helper/dbPool.js";

export const createUserTable = async () => {
  const sql = `
     CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      status VARCHAR(50) DEFAULT 'inactive',
      fName VARCHAR(255) NOT NULL,
      lName VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      address TEXT DEFAULT '',
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      refreshJWT TEXT DEFAULT '',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )
    `;
  try {
    await query(sql);
    console.log("Table created");
  } catch (error) {
    console.log("Error creating User Table:", error);
  }
};

export const createNewUser = async (user) => {
  const { fName, lName, phone, address, email, password } = user;
  const sql = `INSERT INTO users(fName, lName, phone, address, email, password)
   VALUES($1,$2,$3,$4,$5,$6) 
   RETURNING *;`;
  const values = [fName, lName, phone, address, email, password];
  try {
    const res = await query(sql, values);
    return res.rows;
  } catch (error) {
    console.error("Error inserting admin:", error);
    throw error;
  }
};
export const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = $1`;
  try {
    const res = await query(sql, [email]);
    return res.rows;
  } catch (error) {
    console.log("Errors is from getUserByEmail", error);
    return error.stack;
  }
};
export const updateUserById = async (object) => {
  const { id, ...rest } = object;
  const columns = Object.keys(rest)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(rest);

  const sql = `UPDATE users SET ${columns} WHERE id = $${values.length + 1}`;

  try {
    const res = await query(sql, [...values, id]);
    return res.rowCount; // returns the number of rows affected
  } catch (error) {
    console.log("Error is from updateUserById", error);
    return error.stack;
  }
};
export const deleteAdminById = async (id) => {
  const sql = `DELETE FROM users WHERE id = $1`; // `id` is used as the primary key
  const values = [id];

  try {
    const res = await query(sql, values);
    return res.rowCount; // Returns the number of rows deleted
  } catch (error) {
    console.log("Error from deleteAdminById", error);
    return error.stack;
  }
};
