// Import required modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";


// Import rute API
import login from "./api/login.js";
import changepass from "./api/change-password.js";
import quizprogress from "./api/quiz-progress.js";
import resetquiz from "./api/reset-quiz";
import saveprogress from "./api/save-progress.js";
import signup from "./api/signup.js";

// Rute API
app.use("/signup", signup);
app.use("/login", login);
app.use("/save-progress", saveprogress); // Rute untuk verifikasi token
app.use("/change-password", changepass); // Rute untuk signup
app.use("/quiz-progress", quizprogress); // Rute untuk login
app.use("/reset-quiz", resetquiz);

// Check database connection

dotenv.config();
const db = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  dialect: "mysql",
  logging: false,
});
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }



const corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'https://ruangbahasa-be.vercel.app'], // Allow requests from these origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ruang Bahasa application." });
});



// Utility function for querying the database with promises
const queryDb = (query, params) => {
    return db.promise().query(query, params);
};



// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});




