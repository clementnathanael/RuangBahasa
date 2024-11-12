const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Clement100*',
    database: 'ruangbahasa'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// User signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
        const [existingUser] = await db.promise().query(checkUserQuery, [username]);

        if (existingUser.length > 0) {
            // Username already exists
            return res.status(409).json({ message: 'Username sudah ada.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user with hashed password into the database
        const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await db.promise().query(insertUserQuery, [username, hashedPassword]);

        res.status(201).json({ message: 'Signup berhasil' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up' });
    }
});

// User login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username exists
        const query = 'SELECT * FROM users WHERE username = ?';
        const [users] = await db.promise().query(query, [username]);

        if (users.length === 0) {
            // User not found
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Compare the hashed password with the password provided
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
