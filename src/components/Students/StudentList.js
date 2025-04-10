import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent, updateStudent } from '../../api';
import {FiEdit, FiTrash2 } from 'react-icons/fi';
import './StudentList.css';


const StudentList = () => {
  const [students, setStudents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const fetchData = async () => {

    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sinh viên:', error);
    }
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      try {
        await deleteStudent(id);
        alert('Xóa thành công!');
        fetchData();
      } catch (error) {
        alert('Lỗi khi xóa sinh viên');
      }
    }
  };

  const openEditModal = (student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(currentStudent.id, currentStudent);
      alert('Cập nhật thành công!');
      fetchData();
      handleModalClose();
    } catch (error) {
      alert('Lỗi khi cập nhật sinh viên');
    }
  };

  return (
    <div className="student-list-container">
      <div className="header">
        <h2>Danh Sách Sinh Viên</h2>
    
      </div>

      <table>
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ Tên</th>
            <th>Ngày Sinh</th>
            <th>Giới Tính</th>
            <th>Địa Chỉ</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Ngày Nhập Học</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName +' '+student.lastName}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString('vi-VN')}</td>
                <td>{student.gender === 'M' ? 'Nam' : 'Nữ'}</td>
                <td>{student.address}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{new Date(student.enrollmentDate).toLocaleDateString('vi-VN')}</td>
                <td>
                  <button onClick={() => openEditModal(student)} className="edit-btn"><FiEdit /></button>
                  <button onClick={() => handleDelete(student.id)} className="delete-btn"><FiTrash2 /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không có sinh viên nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh Sửa Sinh Viên</h3>
            <form onSubmit={handleUpdate}>
              <label>Họ:</label>
              <input
                type="text"
                value={currentStudent.firstName}
                onChange={(e) => setCurrentStudent({ ...currentStudent, firstName: e.target.value })}
              />

              <label>Tên:</label>
              <input
                type="text"
                value={currentStudent.lastName}
                onChange={(e) => setCurrentStudent({ ...currentStudent, lastName: e.target.value })}
              />

              <label>Ngày Sinh:</label>
              <input
                type="date"
                value={currentStudent.dateOfBirth ? currentStudent.dateOfBirth.split('T')[0] : ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, dateOfBirth: e.target.value })}
              />

              <label>Giới Tính:</label>
              <select
                value={currentStudent.gender}
                onChange={(e) => setCurrentStudent({ ...currentStudent, gender: e.target.value })}
              >
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </select>

              <label>Địa Chỉ:</label>
              <input
                type="text"
                value={currentStudent.address}
                onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })}
              />

              <label>Số Điện Thoại:</label>
              <input
                type="text"
                value={currentStudent.phoneNumber}
                onChange={(e) => setCurrentStudent({ ...currentStudent, phoneNumber: e.target.value })}
              />

              <label>Email:</label>
              <input
                type="email"
                value={currentStudent.email}
                onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
              />
              <label>Ngày Nhập Học:</label>
              <input
                type="date"
                value={currentStudent.enrollmentDate ? currentStudent.enrollmentDate.split('T')[0] : ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, enrollmentDate: e.target.value })}
              />
              <button type="submit">Cập Nhật</button>
              <button type="button" onClick={handleModalClose}>Hủy</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;