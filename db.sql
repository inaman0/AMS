CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password INT NOT NULL,
    role VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester int
);

CREATE TABLE course(
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    instructor_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCE users(id),
    semester INT NOT NULL
);

CREATE TABLE registration(
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCE users(id),
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCE course(course_id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback(
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCE users(id),
    course_id INT,
    FOREIGN KEY (course_id) REFERENCE course(course_id),
    ratings INT,
    comments VARCHAR(1000)
);

CREATE results(
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT UNIQUE NOT NULL,
    FOREIGN KEY (course_id) REFERENCE course(course_id),
    grade VARCHAR(5) NOT NULL,
    email VARCHAR(255),
    FOREIGN KEY (email) REFERENCE users(email)
);