import React from 'react';
import AddDepartment from './AddDepartment';
import DepartmentList from './DepartmentList';
import './DepartmentPage.css';

const DepartmentPage = () => {
  return (
    <div className="department-page-container">
      <h1>Quản Lý Khoa</h1>
      <div className="content">
        <div className="form-section">
          <AddDepartment onAdd={() => window.location.reload()} />
        </div>
        <div className="list-section">
          <DepartmentList />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;