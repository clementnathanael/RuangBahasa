import express from "express";
import bcrypt from "bcryptjs";
import { queryDb } from "../server.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Checking if user exists in the database...");
    const users = await queryDb("SELECT * FROM users WHERE username = ?", [username]);

    if (users.length === 0) {
      console.log("Invalid credentials.");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    console.log("Verifying password...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid credentials.");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Login successful");
    res.status(200).json({ message: "Login successful", user_id: user.id }); // Ensure `user.id` matches your schema
  } catch (error) {
    console.error("Error during login:", error.message); // Simplified error log
    res.status(500).json({ message: "Error during login" });
  }
});

export default router;
