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
            const user = results[0];
            req.session.userId = user.id;
            req.session.department = user.department; // Assuming department is a field in your users table
            req.session.semester = user.semester; // Assuming semester is a field in your users table
            req.session.name = user.name;
            req.session.role = user.role; // Assuming role is a field in your users table

            if (user.role === 'student') {
                return res.redirect('/s_home');
            } else if (user.role === 'teacher') {
                return res.redirect('/t_home');
            } else {
                return res.status(403).send('Unauthorized role.');
            }
        } else {
            // Invalid credentials
            return res.render('index', { error: 'Invalid email or password.' });
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
            res.redirect("/");
        });
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
// Render homepage after login
app.get('/s_home', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/'); // Redirect to login if user is not logged in
    }

    // Get user info from the session
    const user = {
        name: req.session.name, // Assuming `name` is stored in the session
        department: req.session.department,
        semester: req.session.semester,
    };

    res.render('s_home', { user });
});

app.get('/t_home', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/'); // Redirect to login if user is not logged in
    }

    // Get user info from the session
    const user = {
        name: req.session.name, // Assuming `name` is stored in the session
        department: req.session.department,
    };

    res.render('t_home', { user });
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
// Render the course registration form
app.get('/get-courses', (req, res) => {
    const department = req.session.department; // Get department from session
    const semester = req.session.semester; // Get semester from session

    if (!department || !semester) {
        return res.status(400).send('Department and semester are required.');
    }

    const courseSql = 'SELECT course_id, course_name, course_code, credits FROM course WHERE department = ? AND semester = ?';
    connection.query(courseSql, [department, semester], (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).send('Error fetching courses.');
        }

        // Render the course registration page with the list of courses
        res.render('s_registration', { 
            courses: results,
            userId: req.session.userId,
        });
    });
});


// Handle course registration
app.post('/submit-registration', (req, res) => {
    const userId = req.body.user_id;
    const courseIds = req.body.course_id; // FormData sends an array for checkboxes

    if (!userId || !courseIds || courseIds.length === 0) {
        return res.redirect('/get-courses');
    }

    const courseIdsArray = Array.isArray(courseIds) ? courseIds : [courseIds];
    const values = courseIdsArray.map(courseId => [userId, courseId]);

    // Check for duplicates and fetch course codes
    const checkDuplicatesSql = `
        SELECT c.course_code 
        FROM registration r
        JOIN course c ON r.course_id = c.course_id
        WHERE r.user_id = ? AND r.course_id IN (?);
    `;

    connection.query(checkDuplicatesSql, [userId, courseIdsArray], (err, results) => {
        if (err) {
            console.error('Error checking for duplicates:', err);
            return res.status(500).send('An error occurred while checking for duplicate registrations.');
        }

        if (results.length > 0) {
            const duplicateCourses = results.map(row => row.course_code).join(', ');
            return res.status(400).send(`
                <h1>Failed to register courses.</h1>
                <p>You have already registered for the following courses: ${duplicateCourses}</p>
                <a href="/get-courses">Back to Course Registration</a>
            `);
        }

        // Insert new registrations if no duplicates
        const insertSql = 'INSERT INTO registration (user_id, course_id) VALUES ?';

        connection.query(insertSql, [values], (err) => {
            if (err) {
                console.error('Error inserting registrations:', err);
                return res.status(500).send('Failed to register courses. Please try again.');
            }

            res.send(`
                <h1>Courses registered successfully!</h1>
                <a href="/s_home">Back to Homepage</a>
            `);
        });
    });
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
app.get('/feedback', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/'); // Redirect to login page if user is not logged in
    }

    const userId = req.session.userId;
    const department = req.session.department;
    const semester = req.session.semester;

    // Get the list of courses the student is enrolled in but has not submitted feedback for
    const courseSql = `
    SELECT c.course_id, c.course_name, c.course_code
    FROM course c
    JOIN registration r ON c.course_id = r.course_id
    LEFT JOIN feedback f ON f.user_id = r.user_id AND f.course_id = r.course_id
    WHERE r.user_id = ? 
      AND c.department = ? 
      AND c.semester = ?
      AND f.user_id IS NULL
`;


    connection.query(courseSql, [userId, department, semester], (err, courses) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).send('An error occurred while fetching courses.');
        }

        res.render('s_feedback', { user: req.session, courses });
    });
});

app.post('/submit-feedback', (req, res) => {
    // Use userId from session
    const userId = req.session.userId;  // This is the correct way to get the userId from the session

    if (!userId) {
        return res.status(400).send('User not logged in.');
    }

    const feedbackData = [];

    // Loop through all the course IDs to capture feedback
    for (let key in req.body) {
        if (key.startsWith('rating_')) {
            const courseId = key.split('_')[1];
            const rating = req.body[key];
            const comments = req.body[`feedback_${courseId}`] || ''; // Get feedback text

            // Ensure rating is a number between 1 and 5
            if (isNaN(rating) || rating < 1 || rating > 5) {
                return res.status(400).send('Invalid rating. Please select a number between 1 and 5.');
            }

            feedbackData.push({ userId, courseId, rating, comments });
        }
    }

    if (feedbackData.length === 0) {
        return res.status(400).send('No feedback data provided.');
    }

    // Check if the user has already submitted feedback for any of the courses
    const checkDuplicatesSql = `
        SELECT * FROM feedback 
        WHERE user_id = ? AND course_id IN (?);
    `;

    const courseIds = feedbackData.map(feedback => feedback.courseId);

    connection.query(checkDuplicatesSql, [userId, courseIds], (err, results) => {
        if (err) {
            console.error('Error checking for duplicates:', err);
            return res.status(500).send('An error occurred while checking for duplicate feedback.');
        }

        // If feedback already exists for any course, prevent insertion
        if (results.length > 0) {
            const duplicateCourses = results.map(row => row.course_id).join(', ');
            return res.status(400).send(`
                <p>You have already submitted feedback for the following courses: </p>
                <a href="/s_home">Back to Homepage</a>
            `);
        }

        // Insert feedback if no duplicates exist
        const insertSql = 'INSERT INTO feedback (user_id, course_id, ratings, comments) VALUES ?';
        const values = feedbackData.map(f => [f.userId, f.courseId, f.rating, f.comments]);

        connection.query(insertSql, [values], (err) => {
            if (err) {
                console.error('Error inserting feedback:', err);
                return res.status(500).send('An error occurred while submitting your feedback.');
            }

            res.send('<h1>Feedback Submitted Successfully!</h1><a href="/s_home">Back to Homepage</a>');
        });
    });
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
app.get('/history', (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('Unauthorized access.');
    }

    const sql = `
        SELECT r.registration_id,c.course_name, c.course_code, c.credits, r.date
        FROM registration r
        JOIN course c ON r.course_id = c.course_id
        WHERE r.user_id = ?
        ORDER BY r.date DESC;
    `;

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching course history:', err);
            return res.status(500).send('An error occurred while fetching course history.');
        }

        res.render('s_history', { history: results });
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Failed to log out.');
        }
        res.redirect('/'); // Redirect to login page after logout
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
