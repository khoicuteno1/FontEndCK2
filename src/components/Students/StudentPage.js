import React from 'react';
import AddStudent from './AddStudent';
import StudentList from './StudentList';
import './StudentPage.css';

const StudentPage = () => {
  return (
    <div className="student-page-container">
      <h1>Quản Lý Sinh Viên</h1>
      <div className="content">
        <div className="form-section">
          <AddStudent onStudentAdded={() => window.location.reload()}/>
        </div>
        <div className="list-section">
          <StudentList />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
