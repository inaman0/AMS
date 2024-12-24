const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Ndp@2023',
    database: 'testdb',
};

const connection = mysql.createConnection(dbConfig);

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // Set EJS as the templating engine

// Serve the login form
app.get('/', (req, res) => {
    res.render('index', { error: null });
});

// Handle login
app.post('/submit-user', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('An error occurred while processing your request.');
        }

        if (results.length > 0) {
            // Login successful
            res.redirect("https://www.youtube.com");
        } else {
            // Invalid credentials
            res.render('index', { error: 'Invalid email or password.' });
        }
    });
});

// Render sign-up form
app.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

// Handle sign-up
app.post('/submit-signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    // Check if user already exists
    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkUserSql, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('An error occurred while processing your request.');
        }

        if (results.length > 0) {
            // User already exists
            return res.render('signup', { error: 'Email already registered. Please use another email' });
        }

        // Insert new user into database
        const insertSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        connection.query(insertSql, [email, password], (err) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('An error occurred while creating your account.');
            }

            // Redirect to login page after successful sign-up
            res.redirect("https://www.youtube.com");
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
