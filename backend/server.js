// Import required modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Import API routes
import changepass from "./api/changepassword.js";
import quizprogress from "./api/quizprogress.js";
import resetquiz from "./api/resetquiz.js";
import saveprogress from "./api/saveprogress.js";
import signup from "./api/signup.js";
import login from "./api/login.js";

// Load environment variables from .env file
dotenv.config();

// MySQL Database Connection Pool
export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  connectTimeout: 20000,
});

// Initialize Express application
const app = express();

// Middleware to enable CORS and parse incoming JSON requests
app.use(cors({
  origin: 'https://ruang-bahasa.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you need cookies/sessions
}));
app.use(bodyParser.json());

// Simple root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ruang Bahasa application." });
});

// Check MySQL connection on server start and log any connection errors
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Ping the database to check connectivity
    console.log("Database Connected...");
    connection.release(); // Release connection back to pool
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // Optionally, send an email/alert for critical database issues
  }
})();

// Function to execute database queries
const queryDb = async (query, params) => {
  try {
    // Check if the query is a non-empty string
    if (typeof query !== 'string' || !query.trim()) {
      console.error('queryDb called with invalid query:', query);
      throw new Error('Invalid SQL query: Query must be a non-empty string');
    }

    // Ensure params is an array
    if (!Array.isArray(params)) {
      params = [params];
    }

    // Ensure the pool is initialized
    if (!pool) {
      throw new Error('Database connection pool is not initialized');
    }

    // Log the query and params for debugging
    console.log('Executing Query:', query);
    console.log('With Parameters:', params);

    // Execute the query
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error in queryDb:', error);
    throw error;
  }
};

export { queryDb };

// API Routes
app.use("/signup", signup); // Route for user signup
app.use("/login", login); // Route for user login
app.use("/save-progress", saveprogress); // Route for saving progress
app.use("/change-password", changepass); // Route for changing password
app.use("/quiz-progress", quizprogress); // Route for quiz progress
app.use("/reset-quiz", resetquiz); // Route for resetting quiz

// Export the Express app for deployment (e.g., Vercel)
export default app;