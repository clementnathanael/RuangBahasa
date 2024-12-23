import express from "express";
import { queryDb } from "../server.js"; // Import queryDb from server.js

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, quiz_id, progress, total_score } = req.body;

  // Check if the required data is provided
  if (!user_id || !quiz_id || !Array.isArray(progress) || total_score === undefined) {
    return res.status(400).json({ message: 'Invalid data provided' });
  }

  try {
    // Check if the user exists
    console.log("Checking if user exists...");
    const users = await queryDb('SELECT * FROM users WHERE user_id = ?', [user_id]);

    if (users.length === 0) {
      console.log("User not found.");
      return res.status(404).json({ message: 'User not found' });
    }

    const insertProgressQuery = `
      INSERT INTO user_quiz_progress (user_id, quiz_id, question_number, user_answer, correct_answer, score, total_score)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        user_answer = VALUES(user_answer),
        correct_answer = VALUES(correct_answer),
        score = VALUES(score),
        total_score = VALUES(total_score)
    `;

    const insertQuizProgress = `
      INSERT INTO user_progress (user_id, quiz_id, total_score)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        total_score = VALUES(total_score)
    `;

    // Loop through each question and save progress
    for (const question of progress) {
      const { question_number, user_answer, correct_answer, score } = question;

      // Validate question data
      if (question_number && (user_answer !== undefined || user_answer === null)) {
        console.log(`Saving progress for question ${question_number}`, { user_answer, correct_answer, score, total_score });

        // Execute SQL to save the progress
        await queryDb(insertProgressQuery, [
          user_id,
          quiz_id,
          question_number,
          user_answer,
          correct_answer,
          score,
          total_score
        ]);

      } else {
        console.warn(`Skipped invalid progress data for question: ${JSON.stringify(question)}`);
      }
    }

    // Save total score for quiz
    console.log("Saving total quiz progress...");
    await queryDb(insertQuizProgress, [user_id, quiz_id, total_score]);

    console.log("Progress saved successfully.");
    res.status(201).json({ message: 'Progress saved successfully' });
  } catch (error) {
    console.error('Error saving progress:', error.message, error.stack);
    res.status(500).json({ message: 'Error saving progress', error: error.message });
  }
});

export default router;
