-- Table: Students
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    rfid_tag VARCHAR(255)
);

-- Table: Attendance
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- Table: Sensors
CREATE TABLE Sensors (
    sensor_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    location VARCHAR(255)
);

-- Table: Sensor_Data
CREATE TABLE Sensor_Data (
    data_id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_id INT,
    value DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES Sensors(sensor_id)
);

-- Table: Actions
CREATE TABLE Actions (
    action_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    sensor_id INT,
    value DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES Sensors(sensor_id)
);

CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    From_Date VARCHAR(250),
    Till_Date VARCHAR(250),
    Participants_id INT,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- Table: Subjects
CREATE TABLE Subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) UNIQUE
);

-- Table: Subject_Attendance
CREATE TABLE Subject_Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT,
    student_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);
