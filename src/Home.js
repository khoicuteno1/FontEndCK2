import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaUserGraduate, FaBook, FaUniversity, FaClipboardList } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-title">Chào mừng đến với Hệ Thống Quản Lý Sinh Viên</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <FaUserGraduate className="stat-icon" />
          <h3>Quản Lý Sinh Viên</h3>
          <p>Thêm, sửa, xóa và xem thông tin sinh viên</p>
          <Link to="/students" className="stat-link">Xem chi tiết</Link>
        </div>

        <div className="stat-card">
          <FaBook className="stat-icon" />
          <h3>Quản Lý Khóa Học</h3>
          <p>Quản lý các khóa học và tín chỉ</p>
          <Link to="/courses" className="stat-link">Xem chi tiết</Link>
        </div>

        <div className="stat-card">
          <FaUniversity className="stat-icon" />
          <h3>Quản Lý Khoa</h3>
          <p>Quản lý thông tin các khoa</p>
          <Link to="/departments" className="stat-link">Xem chi tiết</Link>
        </div>

        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <h3>Ghi Danh & Điểm</h3>
          <p>Quản lý ghi danh và điểm số</p>
          <Link to="/enrollments" className="stat-link">Xem chi tiết</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Tính Năng Chính</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h4>✓ Quản lý hồ sơ sinh viên</h4>
            <p>Lưu trữ và quản lý thông tin chi tiết của sinh viên</p>
          </div>
          <div className="feature-item">
            <h4>✓ Quản lý khóa học</h4>
            <p>Theo dõi và quản lý các khóa học, tín chỉ</p>
          </div>
          <div className="feature-item">
            <h4>✓ Quản lý điểm số</h4>
            <p>Ghi nhận và theo dõi kết quả học tập</p>
          </div>
          <div className="feature-item">
            <h4>✓ Báo cáo thống kê</h4>
            <p>Xem báo cáo và thống kê tổng quan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
