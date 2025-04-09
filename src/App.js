// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import StudentPage from './components/Students/StudentPage';
import CoursePage from './components/Courses/CoursePage';
import DepartmentPage from './components/Departments/DepartmentPage';
import EnrollmentPage from './components/Enrollments/EnrollmentPage';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/enrollments" element={<EnrollmentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
