import { query } from "express";
import pg from "pg";
import pool from "../helper/dbPool.js";

export const db = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected ");
    client.release();
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
};
