import express from "express";
import { createNewUser, getUserByEmail } from "../model/user/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    res.json({
      status: "success",
      message: "here is the user info",
      user: user,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await createNewUser(req.body);
    if (result.length > 0) {
      const user = result[0];
      if (user?.id) {
        res.json({
          status: success,
          message: "New User created successfully",
        });
      }
    } else
      res.json({
        status: error,
        message: "Error creating new user",
      });
  } catch (error) {
    if (
      error.message.includes(
        "duplicate key value violates unique constraint users_email_key"
      )
    ) {
      error.statusCode = 400;
      error.message =
        "This email is already used by another Admin, Use different email or reset your password";
    }
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const result = await getUserByEmail(email);

  if (result.length > 0) {
    const user = result[0];
    if (user?.id) {
      res.json({
        status: "success",
        message: "login successful",
        user: user,
      });
    }
  } else
    res.json({
      status: "error",
      message: "Invalid login details",
    });
});
export default router;
