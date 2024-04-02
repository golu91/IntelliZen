// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

// Create a new Express application
const app = express();
const port = process.env.PORT || 3000; // Set the port for the server

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root@localhost',
    password: '1011',
    database: 'intelliserver'
});

// Route to fetch all students
app.get('/students', (req, res) => {
    pool.query('SELECT * FROM Students', (error, results) => {
        if (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'An error occurred while fetching students' });
        } else {
            res.json(results);
        }
    });
});

// Route to add a new student
app.post('/students', (req, res) => {
    const { name, rfid_tag } = req.body;
    pool.query('INSERT INTO Students (name, rfid_tag) VALUES (?, ?)', [name, rfid_tag], (error, results) => {
        if (error) {
            console.error('Error adding student:', error);
            res.status(500).json({ error: 'An error occurred while adding student' });
        } else {
            res.json({ message: 'Student added successfully' });
        }
    });
});

// Route to update a student
app.put('/students/:studentId', (req, res) => {
    const { name, rfid_tag } = req.body;
    const studentId = req.params.studentId;
    pool.query('UPDATE Students SET name = ?, rfid_tag = ? WHERE student_id = ?', [name, rfid_tag, studentId], (error, results) => {
        if (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ error: 'An error occurred while updating student' });
        } else {
            res.json({ message: 'Student updated successfully' });
        }
    });
});

// Route to delete a student
app.delete('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    pool.query('DELETE FROM Students WHERE student_id = ?', [studentId], (error, results) => {
        if (error) {
            console.error('Error deleting student:', error);
            res.status(500).json({ error: 'An error occurred while deleting student' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    });
});

// route to fetch student attendance
app.get('/attendance', (req, res) => {
    // Query the database to fetch attendance data
    pool.query('SELECT * FROM Attendance', (error, results) => {
        if (error) {
            console.error('Error fetching attendance:', error);
            res.status(500).json({ error: 'An error occurred while fetching attendance' });
        } else {
            res.json(results);
        }
    });
});

// route to handle form submissions (e.g., submitting attendance)
app.post('/attendance', (req, res) => {
    // Parse request body and insert data into the database
    const { studentId, date } = req.body; // Assuming request body contains studentId and date
    pool.query('INSERT INTO Attendance (student_id, date) VALUES (?, ?)', [studentId, date], (error, results) => {
        if (error) {
            console.error('Error submitting attendance:', error);
            res.status(500).json({ error: 'An error occurred while submitting attendance' });
        } else {
            res.json({ message: 'Attendance submitted successfully' });
        }
    });
});

// route to handle submitting sensor data
app.post('/sensor-data', (req, res) => {
    // Parse request body and insert sensor data into the database
    const { sensorId, value } = req.body; // Assuming request body contains sensorId and value
    const timestamp = new Date(); // Assuming sensor data includes a timestamp
    pool.query('INSERT INTO Sensor_Data (sensor_id, value, timestamp) VALUES (?, ?, ?)', [sensorId, value, timestamp], (error, results) => {
        if (error) {
            console.error('Error submitting sensor data:', error);
            res.status(500).json({ error: 'An error occurred while submitting sensor data' });
        } else {
            res.json({ message: 'Sensor data submitted successfully' });
        }
    });
});

// route to fetch sensor data
app.get('/sensor-data', (req, res) => {
    // Query the database to fetch sensor data
    // Modify the SQL query as needed to filter data based on request parameters
    pool.query('SELECT * FROM Sensor_Data', (error, results) => {
        if (error) {
            console.error('Error fetching sensor data:', error);
            res.status(500).json({ error: 'An error occurred while fetching sensor data' });
        } else {
            res.json(results);
        }
    });
});

// route to adjust classroom conditions
app.post('/control/lights', (req, res) => {
    const { intensity, color } = req.body;

    // Simulate controlling lights based on intensity and color
    // This is just a placeholder for demonstration purposes
    controlLights(intensity, color)
        .then(() => {
            res.json({ message: 'Lights controlled successfully' });
        })
        .catch(error => {
            console.error('Error controlling lights:', error);
            res.status(500).json({ error: 'An error occurred while controlling lights' });
        });
});

// Function to simulate controlling lights based on intensity and color
function controlLights(intensity, color) {
    return new Promise((resolve, reject) => {
        // Simulate controlling lights based on intensity and color
        console.log('Controlling lights with intensity:', intensity, 'and color:', color);

        // Simulate a delay for demonstration purposes
        setTimeout(() => {
            resolve();
        }, 1000); // 1 second delay
});
}
app.post('/control/fans', (req, res) => {
    const { intensity } = req.body;

    // Simulate controlling fans based on intensity
    // This is just a placeholder for demonstration purposes
    controlFans(intensity)
        .then(() => {
            res.json({ message: 'Fans controlled successfully' });
        })
        .catch(error => {
            console.error('Error controlling fans:', error);
            res.status(500).json({ error: 'An error occurred while controlling fans' });
        });
});

// Function to control fans based on intensity
function controlFans(intensity) {
    return new Promise((resolve, reject) => {
        // Simulate controlling fans based on intensity
        console.log('Controlling fans with intensity:', intensity);

        // Simulate a delay for demonstration purposes
        setTimeout(() => {
            resolve();
        }, 1000); // 1 second delay
});
}

app.post('/control/ac', (req, res) => {
    const { temperature } = req.body;

    // Simulate controlling AC units based on temperature
    // This is just a placeholder for demonstration purposes
    controlAC(temperature)
        .then(() => {
            res.json({ message: 'AC units controlled successfully' });
        })
        .catch(error => {
            console.error('Error controlling AC units:', error);
            res.status(500).json({ error: 'An error occurred while controlling AC units' });
        });
});

// Function to control AC units based on temperature
function controlAC(temperature) {
    return new Promise((resolve, reject) => {
        // Simulate controlling AC units based on temperature
        console.log('Controlling AC units with temperature:', temperature);

        // Simulate a delay for demonstration purposes
        setTimeout(() => {
            resolve();
        }, 1000); // 1 second delay
});
}

// route to manage student information 
app.post('/students', (req, res) => {
    const { name, rfid_tag } = req.body;
    // Query to insert a new student into the database
    const query = 'INSERT INTO Students (name, rfid_tag) VALUES (?, ?)';
    // Execute the query with the provided name and RFID tag
    pool.query(query, [name, rfid_tag], (error, results) => {
        if (error) {
            console.error('Error adding student:', error);
            res.status(500).json({ error: 'An error occurred while adding student' });
        } else {
            res.json({ message: 'Student added successfully' });
        }
    });
});

// route to update student details in the database
app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, rfid_tag } = req.body;
    // Query to update student details in the database
    const query = 'UPDATE Students SET name = ?, rfid_tag = ? WHERE student_id = ?';
    // Execute the query with the provided name, RFID tag, and student ID
    pool.query(query, [name, rfid_tag, studentId], (error, results) => {
        if (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ error: 'An error occurred while updating student' });
        } else {
            res.json({ message: 'Student updated successfully' });
        }
    });
});

app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    // Query to delete a student from the database
    const query = 'DELETE FROM Students WHERE student_id = ?';
    // Execute the query with the provided student ID
    pool.query(query, [studentId], (error, results) => {
        if (error) {
            console.error('Error deleting student:', error);
            res.status(500).json({ error: 'An error occurred while deleting student' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    });
});

// route to fetch classroom status 
app.get('/classroom-status', (req, res) => {
    // Query to fetch classroom data from different tables
    const query = `
        SELECT 
            COUNT(*) AS total_students,
            AVG(fan_speed) AS avg_fan_speed,
            AVG(ac_temperature) AS avg_ac_temperature
        FROM Students
        JOIN FanData ON Students.student_id = FanData.student_id
        JOIN ACData ON Students.student_id = ACData.student_id
        WHERE Students.classroom_id = ?
    `;
    
    // Execute the query with the classroom ID
    const classroomId = req.query.classroomId; // Assuming the classroom ID is passed as a query parameter
    pool.query(query, [classroomId], (error, results) => {
        if (error) {
            console.error('Error fetching classroom data:', error);
            res.status(500).json({ error: 'An error occurred while fetching classroom data' });
        } else {
            // Extract the aggregated data from the query results
            const aggregatedData = results[0];
            res.json(aggregatedData);
        }
    });
});

// route for student registration
app.post('/register', (req, res) => {
    // Parse request body and insert student registration data into the database
    const { name, studentId, email } = req.body; // Assuming request body contains student information
    pool.query('INSERT INTO Students (name, student_id, email) VALUES (?, ?, ?)', [name, studentId, email], (error, results) => {
        if (error) {
            console.error('Error registering student:', error);
            res.status(500).json({ error: 'An error occurred while registering student' });
        } else {
            res.json({ message: 'Student registered successfully' });
        }
    });
});

// route for notifications
app.post('/notify/students', (req, res) => {
    const { studentIds, message } = req.body;

    // Construct email options
    const mailOptions = {
        from: 'your_email@gmail.com',
        subject: 'Notification from Smart Classroom System',
        text: message
    };

    // Send notifications to each student
    studentIds.forEach(studentId => {
        // Retrieve student email address from database based on studentId
        const studentEmail = getStudentEmail(studentId); // Replace with your actual function to fetch student email

        // Update the mail options with the recipient's email address
        mailOptions.to = studentEmail;

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending notification:', error);
            } else {
                console.log('Notification sent:', info.response);
            }
        });
    });

    // Respond with success message
    res.json({ message: 'Notifications sent successfully' });
});

app.post('/notify/teachers', (req, res) => {
    const { teacherIds, message } = req.body;

    // Construct email options
    const mailOptions = {
        from: 'your_email@gmail.com',
        subject: 'Notification from Smart Classroom System',
        text: message
    };

    // Send notifications to each teacher
    teacherIds.forEach(teacherId => {
        // Retrieve teacher email address from database based on teacherId
        const teacherEmail = getTeacherEmail(teacherId); // Replace with your actual function to fetch teacher email

        // Update the mail options with the recipient's email address
        mailOptions.to = teacherEmail;

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending notification:', error);
            } else {
                console.log('Notification sent:', info.response);
            }
        });
    });

    // Respond with success message
    res.json({ message: 'Notifications sent successfully' });
});

// route for event logging
app.post('/log/event', (req, res) => {
    const { event_type, description } = req.body;

    // Construct SQL query to insert event into the database
    const query = 'INSERT INTO Events (event_type, description) VALUES (?, ?)';
    
    // Execute the query with the provided event type and description
    pool.query(query, [event_type, description], (error, results) => {
        if (error) {
            console.error('Error logging event:', error);
            res.status(500).json({ error: 'An error occurred while logging event' });
        } else {
            res.json({ message: 'Event logged successfully' });
        }
    });
});

// Route to fetch all events
app.get('/events', (req, res) => {
    pool.query('SELECT * FROM Events', (error, results) => {
        if (error) {
            console.error('Error fetching events:', error);
            res.status(500).json({ error: 'An error occurred while fetching events' });
        } else {
            res.json(results);
        }
    });
});

// Route to add a new event
app.post('/events', (req, res) => {
    const { description } = req.body;
    pool.query('INSERT INTO Events (description) VALUES (?)', [description], (error, results) => {
        if (error) {
            console.error('Error adding event:', error);
            res.status(500).json({ error: 'An error occurred while adding event' });
        } else {
            res.json({ message: 'Event added successfully' });
        }
    });
});

// Route to handle student applications for on-duty roles
app.post('/events/:eventId/apply', (req, res) => {
    const { eventId, studentId } = req.body;
    pool.query('INSERT INTO Event_Applications (event_id, student_id) VALUES (?, ?)', [eventId, studentId], (error, results) => {
        if (error) {
            console.error('Error applying for event:', error);
            res.status(500).json({ error: 'An error occurred while applying for event' });
        } else {
            res.json({ message: 'Application submitted successfully' });
        }
    });
});

// Route to fetch subject-wise attendance
app.get('/attendance/subject/:subjectId', (req, res) => {
    const { subjectId } = req.params;

    // Query the database to fetch attendance data for the specified subject
    pool.query('SELECT * FROM Attendance WHERE subject_id = ?', [subjectId], (error, results) => {
        if (error) {
            console.error('Error fetching subject-wise attendance:', error);
            res.status(500).json({ error: 'An error occurred while fetching subject-wise attendance' });
        } else {
            res.json(results);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
