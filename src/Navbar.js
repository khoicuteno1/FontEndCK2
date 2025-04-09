import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">QLSV</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> Trang Chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/students" className="nav-link">
              <i className="fas fa-user-graduate"></i> Sinh Viên
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              <i className="fas fa-book"></i> Khóa Học
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/departments" className="nav-link">
              <i className="fas fa-university"></i> Khoa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/enrollments" className="nav-link">
              <i className="fas fa-clipboard-list"></i> Ghi Danh và điểm
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
