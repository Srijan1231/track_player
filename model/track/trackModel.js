import { query } from "../../helper/dbPool";

export const createTrackTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS track(
        id SERIAL PRIMARY KEY,
        title VARCHAR(225) NOT NULL,
        duration INT, --in seconds
        genre VARCHAR(100),
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
