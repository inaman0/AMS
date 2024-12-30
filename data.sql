USE testdb;

-- inserting users
INSERT INTO users (name, email, password, role, department, semester) VALUES
    -- for student
    -- SMCS Department
    ('student1', 'student1@mail.com', 123, 'student', 'SMCS', 1),
    ('student2', 'student2@mail.com', 123, 'student', 'SMCS', 1),
    ('student3', 'student3@mail.com', 123, 'student', 'SMCS', 2),
    ('student4', 'student4@mail.com', 123, 'student', 'SMCS', 2),
    ('student5', 'student5@mail.com', 123, 'student', 'SMCS', 3),
    ('student6', 'student6@mail.com', 123, 'student', 'SMCS', 3),
    ('student7', 'student7@mail.com', 123, 'student', 'SMCS', 4),
    ('student8', 'student8@mail.com', 123, 'student', 'SMCS', 4),
    ('student9', 'student9@mail.com', 123, 'student', 'SMCS', 5),
    ('student10', 'student10@mail.com', 123, 'student', 'SMCS', 5),
    ('student11', 'student11@mail.com', 123, 'student', 'SMCS', 6),
    ('student12', 'student12@mail.com', 123, 'student', 'SMCS', 6),
    ('student13', 'student13@mail.com', 123, 'student', 'SMCS', 7),
    ('student14', 'student14@mail.com', 123, 'student', 'SMCS', 7),
    ('student15', 'student15@mail.com', 123, 'student', 'SMCS', 8),
    ('student16', 'student16@mail.com', 123, 'student', 'SMCS', 8);

INSERT INTO users (name, email, password, role, department, semester) VALUES
    -- SES Department
    ('student17', 'student17@mail.com', 123, 'student', 'SES', 1),
    ('student18', 'student18@mail.com', 123, 'student', 'SES', 1),
    ('student19', 'student19@mail.com', 123, 'student', 'SES', 2),
    ('student20', 'student20@mail.com', 123, 'student', 'SES', 2),
    ('student21', 'student21@mail.com', 123, 'student', 'SES', 3),
    ('student22', 'student22@mail.com', 123, 'student', 'SES', 3),
    ('student23', 'student23@mail.com', 123, 'student', 'SES', 4),
    ('student24', 'student24@mail.com', 123, 'student', 'SES', 4),
    ('student25', 'student25@mail.com', 123, 'student', 'SES', 5),
    ('student26', 'student26@mail.com', 123, 'student', 'SES', 5),
    ('student27', 'student27@mail.com', 123, 'student', 'SES', 6),
    ('student28', 'student28@mail.com', 123, 'student', 'SES', 6),
    ('student29', 'student29@mail.com', 123, 'student', 'SES', 7),
    ('student30', 'student30@mail.com', 123, 'student', 'SES', 7),
    ('student31', 'student31@mail.com', 123, 'student', 'SES', 8),
    ('student32', 'student32@mail.com', 123, 'student', 'SES', 8);

INSERT INTO users (name, email, password, role, department, semester) VALUES
    -- SMS Department
    ('student33', 'student33@mail.com', 123, 'student', 'SMS', 1),
    ('student34', 'student34@mail.com', 123, 'student', 'SMS', 1),
    ('student35', 'student35@mail.com', 123, 'student', 'SMS', 2),
    ('student36', 'student36@mail.com', 123, 'student', 'SMS', 2),
    ('student37', 'student37@mail.com', 123, 'student', 'SMS', 3),
    ('student38', 'student38@mail.com', 123, 'student', 'SMS', 3),
    ('student39', 'student39@mail.com', 123, 'student', 'SMS', 4),
    ('student40', 'student40@mail.com', 123, 'student', 'SMS', 4),
    ('student41', 'student41@mail.com', 123, 'student', 'SMS', 5),
    ('student42', 'student42@mail.com', 123, 'student', 'SMS', 5),
    ('student43', 'student43@mail.com', 123, 'student', 'SMS', 6),
    ('student44', 'student44@mail.com', 123, 'student', 'SMS', 6),
    ('student45', 'student45@mail.com', 123, 'student', 'SMS', 7),
    ('student46', 'student46@mail.com', 123, 'student', 'SMS', 7),
    ('student47', 'student47@mail.com', 123, 'student', 'SMS', 8),
    ('student48', 'student48@mail.com', 123, 'student', 'SMS', 8);

    -- for teacher
INSERT INTO users (name, email, password, role, department) VALUES
    -- SMCS Department
    ('teacher1', 'teacher1@mail.com', 123, 'teacher', 'SMCS'),
    ('teacher2', 'teacher2@mail.com', 123, 'teacher', 'SMCS'),
    ('teacher3', 'teacher3@mail.com', 123, 'teacher', 'SMCS'),
    ('teacher4', 'teacher4@mail.com', 123, 'teacher', 'SMCS');

INSERT INTO users (name, email, password, role, department) VALUES
    -- SES Department
    ('teacher5', 'teacher5@mail.com', 123, 'teacher', 'SES'),
    ('teacher6', 'teacher6@mail.com', 123, 'teacher', 'SES'),
    ('teacher7', 'teacher7@mail.com', 123, 'teacher', 'SES'),
    ('teacher8', 'teacher8@mail.com', 123, 'teacher', 'SES');

INSERT INTO users (name, email, password, role, department) VALUES
    -- SMS Department
    ('teacher9', 'teacher9@mail.com', 123, 'teacher', 'SMS'),
    ('teacher10', 'teacher10@mail.com', 123, 'teacher', 'SMS'),
    ('teacher11', 'teacher11@mail.com', 123, 'teacher', 'SMS'),
    ('teacher12', 'teacher12@mail.com', 123, 'teacher', 'SMS');

-- inserting courses

-- SMCS (Computer Science and Engineering) Department
INSERT INTO course (course_name, course_code, credits, department, instructor_id, semester)
VALUES
    -- Semester 1
    ('Introduction to Programming', 'CS101', 3, 'SMCS', 82, 1),
    ('Data Structures and Algorithms', 'CS102', 4, 'SMCS', 82, 1),
    ('Discrete Mathematics', 'CS103', 3, 'SMCS', 82, 1),
    ('Computer Organization and Architecture', 'CS104', 4, 'SMCS', 82, 1),

    -- Semester 2
    ('Operating Systems', 'CS201', 3, 'SMCS', 82, 2),
    ('Database Management Systems', 'CS202', 4, 'SMCS', 82, 2),
    ('Computer Networks', 'CS203', 3, 'SMCS', 82, 2),
    ('Software Engineering', 'CS204', 4, 'SMCS', 82, 2),

    -- Semester 3
    ('Theory of Computation', 'CS301', 3, 'SMCS', 83, 3),
    ('Artificial Intelligence', 'CS302', 4, 'SMCS', 83, 3),
    ('Design and Analysis of Algorithms', 'CS303', 3, 'SMCS', 83, 3),
    ('Compiler Design', 'CS304', 4, 'SMCS', 83, 3),

    -- Semester 4
    ('Machine Learning', 'CS401', 3, 'SMCS', 83, 4),
    ('Web Technologies', 'CS402', 4, 'SMCS', 83, 4),
    ('Data Science', 'CS403', 3, 'SMCS', 83, 4),
    ('Cyber Security', 'CS404', 4, 'SMCS', 83, 4),

    -- Semester 5
    ('Cloud Computing', 'CS501', 3, 'SMCS', 84, 5),
    ('Mobile App Development', 'CS502', 4, 'SMCS', 84, 5),
    ('Blockchain Technology', 'CS503', 3, 'SMCS', 84, 5),
    ('Big Data Analytics', 'CS504', 4, 'SMCS', 84, 5),

    -- Semester 6
    ('Advanced Algorithms', 'CS601', 3, 'SMCS', 84, 6),
    ('Software Testing', 'CS602', 4, 'SMCS', 84, 6),
    ('Human-Computer Interaction', 'CS603', 3, 'SMCS', 84, 6),
    ('Computational Biology', 'CS604', 4, 'SMCS', 84, 6),

    -- Semester 7
    ('Data Visualization', 'CS701', 3, 'SMCS', 85, 7),
    ('Natural Language Processing', 'CS702', 4, 'SMCS', 85, 7),
    ('Cloud Security', 'CS703', 3, 'SMCS', 85, 7),
    ('Advanced Machine Learning', 'CS704', 4, 'SMCS', 85, 7),

    -- Semester 8
    ('Distributed Systems', 'CS801', 3, 'SMCS', 85, 8),
    ('Computer Vision', 'CS802', 4, 'SMCS', 85, 8),
    ('Deep Learning', 'CS803', 3, 'SMCS', 85, 8),
    ('Artificial Intelligence Ethics', 'CS804', 4, 'SMCS', 85, 8);


-- SES (Electrical Engineering) Department

INSERT INTO course (course_name, course_code, credits, department, instructor_id, semester)
VALUES
    -- Semester 1
    ('Circuit Theory', 'EE101', 3, 'SES', 86, 1),
    ('Electronics Devices', 'EE102', 4, 'SES', 86, 1),
    ('Signals and Systems', 'EE103', 3, 'SES', 86, 1),
    ('Electromagnetic Fields', 'EE104', 4, 'SES', 86, 1),

    -- Semester 2
    ('Control Systems', 'EE201', 3, 'SES', 86, 2),
    ('Power Systems', 'EE202', 4, 'SES', 86, 2),
    ('Digital Signal Processing', 'EE203', 3, 'SES', 86, 2),
    ('Microcontrollers and Embedded Systems', 'EE204', 4, 'SES', 86, 2),

    -- Semester 3
    ('Electric Machines', 'EE301', 3, 'SES', 87, 3),
    ('Power Electronics', 'EE302', 4, 'SES', 87, 3),
    ('Communication Systems', 'EE303', 3, 'SES', 87, 3),
    ('Renewable Energy Systems', 'EE304', 4, 'SES', 87, 3),

    -- Semester 4
    ('Smart Grids', 'EE401', 3, 'SES', 87, 4),
    ('Electrical Measurements', 'EE402', 4, 'SES', 87, 4),
    ('High Voltage Engineering', 'EE403', 3, 'SES', 87, 4),
    ('Electrical Machines Design', 'EE404', 4, 'SES', 87, 4),

    -- Semester 5
    ('Power System Protection', 'EE501', 3, 'SES', 88, 5),
    ('Energy Storage Systems', 'EE502', 4, 'SES', 88, 5),
    ('Telecommunications Engineering', 'EE503', 3, 'SES', 88, 5),
    ('HVDC Transmission', 'EE504', 4, 'SES', 88, 5),

    -- Semester 6
    ('Electrical Drives', 'EE601', 3, 'SES', 88, 6),
    ('Electric Power Distribution', 'EE602', 4, 'SES', 88, 6),
    ('Digital Communication Systems', 'EE603', 3, 'SES', 88, 6),
    ('Sustainable Energy Systems', 'EE604', 4, 'SES', 88, 6),

    -- Semester 7
    ('Smart Grids Technologies', 'EE701', 3, 'SES', 89, 7),
    ('Electric Power Quality', 'EE702', 4, 'SES', 89, 7),
    ('Electrical Engineering Materials', 'EE703', 3, 'SES', 89, 7),
    ('Power Electronics Applications', 'EE704', 4, 'SES', 89, 7),

    -- Semester 8
    ('Advanced Power Systems', 'EE801', 3, 'SES', 89, 8),
    ('Electrical Machine Design', 'EE802', 4, 'SES', 89, 8),
    ('Control Systems Applications', 'EE803', 3, 'SES', 89, 8),
    ('Power System Stability', 'EE804', 4, 'SES', 89, 8);


-- SMS (Mechanical Engineering) Department
INSERT INTO course (course_name, course_code, credits, department, instructor_id, semester)
VALUES
    -- Semester 1
    ('Engineering Mechanics', 'ME101', 3, 'SMS', 90, 1),
    ('Strength of Materials', 'ME102', 4, 'SMS', 90, 1),
    ('Fluid Mechanics', 'ME103', 3, 'SMS', 90, 1),
    ('Thermodynamics', 'ME104', 4, 'SMS', 90, 1),

    -- Semester 2
    ('Heat Transfer', 'ME201', 3, 'SMS', 90, 2),
    ('Machine Design', 'ME202', 4, 'SMS', 90, 2),
    ('Dynamics of Machines', 'ME203', 3, 'SMS', 90, 2),
    ('Manufacturing Processes', 'ME204', 4, 'SMS', 90, 2),

    -- Semester 3
    ('Mechanics of Materials', 'ME301', 3, 'SMS', 91, 3),
    ('Refrigeration and Air Conditioning', 'ME302', 4, 'SMS', 91, 3),
    ('Internal Combustion Engines', 'ME303', 3, 'SMS', 91, 3),
    ('Finite Element Analysis', 'ME304', 4, 'SMS', 91, 3),

    -- Semester 4
    ('Vibrations', 'ME401', 3, 'SMS', 91, 4),
    ('Robotics', 'ME402', 4, 'SMS', 91, 4),
    ('Advanced Manufacturing Techniques', 'ME403', 3, 'SMS', 91, 4),
    ('Automobile Engineering', 'ME404', 4, 'SMS', 91, 4),

    -- Semester 5
    ('Aerospace Engineering', 'ME501', 3, 'SMS', 92, 5),
    ('Hydraulic Systems', 'ME502', 4, 'SMS', 92, 5),
    ('Thermal Systems', 'ME503', 3, 'SMS', 92, 5),
    ('Mechatronics', 'ME504', 4, 'SMS', 92, 5),

    -- Semester 6
    ('Production Engineering', 'ME601', 3, 'SMS', 92, 6),
    ('Automated Manufacturing Systems', 'ME602', 4, 'SMS', 92, 6),
    ('Advanced Thermal Engineering', 'ME603', 3, 'SMS', 92, 6),
    ('Industrial Engineering', 'ME604', 4, 'SMS', 92, 6),

    -- Semester 7
    ('Advanced Robotics', 'ME701', 3, 'SMS', 93, 7),
    ('Additive Manufacturing', 'ME702', 4, 'SMS', 93, 7),
    ('Control Systems for Machines', 'ME703', 3, 'SMS', 93, 7),
    ('Renewable Energy Engineering', 'ME704', 4, 'SMS', 93, 7),

    -- Semester 8
    ('Finite Element Analysis II', 'ME801', 3, 'SMS', 93, 8),
    ('Bio-mechanics', 'ME802', 4, 'SMS', 93, 8),
    ('Advanced Manufacturing Technologies II', 'ME803', 3, 'SMS', 93, 8),
    ('Mechatronics II', 'ME804', 4, 'SMS', 93, 8);
