import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { db } from "./db/db.js";
import userRouter from "./routes/userRouter.js";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

db();
app.get("/", (req, res) => {
  res.json({
    status: "Ok",
    message: "Server up and running",
  });
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
