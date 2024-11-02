import { query } from "../../helper/dbPool.js";

export const createTrackTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS track(
        id SERIAL PRIMARY KEY,
        title VARCHAR(225) NOT NULL,
        mp3 VARCHAR(225) NOT NULL,
        user_id INT NOT NULL, -- Foreign key to link to the users table
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
  try {
    await query(sql);
  } catch (error) {
    throw new Error("Unable to create track table", error);
  }
};

export const addNewTrack = async (track) => {
  await createTrackTable();
  const { title, mp3, user_id } = track;
  const sql = `INSERT INTO track (title,mp3,user_id)
    VALUES($1,$2,$3) 
    RETURNING *;`;
  const values = [title, mp3, user_id];
  try {
    const res = await query(sql, values);
    return res.rows;
  } catch (error) {
    throw new Error("Cannot add new track", error);
  }
};

export const getTrackByID = async (id) => {
  const sql = `SELECT * FROM track WHERE id = $1`;
  try {
    const res = await query(sql, [id]);
    return res.rows;
  } catch (error) {
    throw new Error("Unable to fetch track by id", error);
  }
};
export const getTracksByUserId = async (user_id) => {
  const sql = `SELECT * FROM track WHERE user_id = $1  `;
  try {
    const res = await query(sql, [user_id]);
    return res.rows;
  } catch (error) {
    throw new Error("Cannot fetch tracks by user", error);
  }
};
export const deleteTrackByID = async (id) => {
  const sql = `DELETE FROM track WHERE id = $1`;
  try {
    const res = await query(sql, [id]);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Problem with deleting track");
  }
};
