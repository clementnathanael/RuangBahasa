import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../server.js"; // Import pool from server.js
const router = express.Router();

router.get("/", async (req, res) => {
    const { username, quiz_id } = req.query;
    const getUserQuery = "SELECT user_id FROM users WHERE username = ?";
  
    try {
      const [userResults] = await pool.query(getUserQuery, [username]);
  
      if (userResults.length === 0) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const user_id = userResults[0].user_id;
      const getProgressQuery = "SELECT quiz_id, total_score FROM user_progress WHERE user_id = ? AND quiz_id = ?";
  
      const [progressResults] = await pool.query(getProgressQuery, [user_id, quiz_id]);
  
      if (progressResults.length === 0) {
        return res.send({ status: "not_started" });
      }
  
      res.send(progressResults[0]);
    } catch (err) {
      console.error("Error fetching quiz progress:", err);
      res.status(500).send({ message: "Error fetching quiz progress" });
    }
  });

export default router;