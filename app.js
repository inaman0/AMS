const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
// Set up a Content Security Policy (CSP) that allows blob URLs for scripts
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Ndp@2023',
    database: 'testdb',
};

const connection = mysql.createConnection(dbConfig);

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // Set EJS as the templating engine

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
// Serve the login form
app.get('/', (req, res) => {
    res.render('index', { error: null });
});

// Handle login
app.post('/submit-user', (req, res) => {
    const userId = req.session.userId;
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
            req.session.userId=results[0].id;
            res.redirect("/registration");
        } else {
            // Invalid credentials
            res.render('index', { error: 'Invalid email or password.' });
        }
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
// Render sign-up form
app.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

// Handle sign-up
app.post('/submit-signup', (req, res) => {
    const {name,email,password,role,semester,dropdown} = req.body;

    if (!name || !email || !password || !role || (role === 'student' && !semester) || !dropdown) {
        return res.status(400).send('All fields are required.');
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
        const insertSql = 'INSERT INTO users (name,email,password,role,semester,department) VALUES (?,?,?,?,?,?)';
        connection.query(insertSql,[name,email,password,role,semester||null,dropdown], (err) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('An error occurred while creating your account.');
            }

            // Redirect to login page after successful sign-up
            res.redirect("/login");
        });
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Render the course registration form
app.get('/registration', (req, res) => {
    const userId = req.session.userId;  // Assuming the user ID is stored in the session

    if (!userId) {
        return res.status(401).send('User not logged in.');
    }

    // Query the database for the student's department and semester based on their userId
    const sql = 'SELECT department, semester FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).send('Error fetching user details.');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found.');
        }

        const { department, semester } = results[0];

        // Query the courses based on department and semester
        const coursesSql = 'SELECT * FROM course WHERE department = ? AND semester = ?';
        connection.query(coursesSql, [department, semester], (err, courseResults) => {
            if (err) {
                console.error('Error fetching courses:', err);
                return res.status(500).send('Error fetching courses.');
            }

            // Create HTML options for courses
            let options = '<option value="">Select a course</option>';
            courseResults.forEach(course => {
                options += `<option value="${course.course_id}">${course.course_id} - ${course.course_name}</option>`;
            });

            // Send the course options as part of the response
            res.send(options);
        });
    });
});

// Handle course registration
app.post('/registration', (req, res) => {
    const user_id = req.body.user_id;
    const course_ids = req.body.course_id;  // course_id is an array

    if (!user_id || !course_ids || course_ids.length === 0) {
        return res.status(400).send('Student ID and at least one course ID are required.');
    }

    // Check if the student exists
    const checkSql = `
        SELECT 
            (SELECT COUNT(*) FROM users WHERE id = ? AND role = 'student') AS student_exists
    `;
    connection.query(checkSql, [user_id], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('An error occurred while processing your request.');
        }

        const { student_exists } = results[0];
        if (!student_exists) {
            return res.render('registration', { error: 'Student does not exist.' });
        }

        // Insert the course registrations for each selected course
        const insertPromises = course_ids.map(course_id => {
            return new Promise((resolve, reject) => {
                const insertSql = 'INSERT INTO registration (user_id, course_id) VALUES (?, ?)';
                connection.query(insertSql, [user_id, course_id], (err) => {
                    if (err) {
                        reject('Error inserting registration for course ' + course_id);
                    } else {
                        resolve();
                    }
                });
            });
        });

        // Wait for all insertions to complete
        Promise.all(insertPromises)
            .then(() => {
                res.send('Courses registered successfully!');
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('An error occurred while registering the courses.');
            });
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
