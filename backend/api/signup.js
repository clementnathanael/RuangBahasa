import express from "express";
import bcrypt from "bcryptjs";
import { queryDb } from "../server.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received signup request:", { username, password }); // Debugging request data

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password harus diisi." });
  }

  try {
    // Check if the username already exists
    console.log("Checking if username already exists in the database...");
    const existingUser = await queryDb("SELECT * FROM users WHERE username = ?", [username]);

    console.log("Existing user query result:", existingUser); // Log the result of the query

    if (existingUser.length > 0) {
      console.log("Username already exists.");
      return res.status(409).json({ message: "Username sudah ada. Silakan membuat username baru" });
    }

    // Hash the password
    console.log("Hashing the password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    console.log("Inserting new user into the database...");
    const result = await queryDb("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    // Log the result of the insertion query
    console.log("Insertion result:", result);

    console.log("Signup successful");
    res.status(201).json({ message: "Signup berhasil" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
});

export default router;
