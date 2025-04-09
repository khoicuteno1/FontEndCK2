import React, { useEffect, useState } from 'react';
import { getDepartments, deleteDepartment, updateDepartment } from '../../api';
import {FiEdit, FiTrash2 } from 'react-icons/fi';
import './DepartmentList.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa khoa này không?");
    if (!confirmDelete) return;
  
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((d) => d.id !== id));
      alert('Xóa khoa thành công!');
    } catch (error) {
      console.error("Lỗi khi xóa khoa:", error);
      alert('Có lỗi xảy ra khi xóa khoa!');
    }
  };

  const openEditModal = (department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDepartment(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment(currentDepartment.id, currentDepartment);
      setDepartments(departments.map(dept => 
        dept.id === currentDepartment.id ? currentDepartment : dept
      ));
      alert('Cập nhật thành công!');
      handleModalClose();
    } catch (error) {
      console.error('Lỗi khi cập nhật khoa:', error);
      alert('Có lỗi xảy ra khi cập nhật khoa!');
    }
  };

  return (
    <div className="department-list">
      <h2>Danh Sách Khoa</h2>
      <div className="table-container">
        <table className="department-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khoa</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td>{dept.departmentName}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => openEditModal(dept)}>
                        <FiEdit /> Sửa
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(dept.id)}>
                        <FiTrash2 /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">Chưa có khoa nào được thêm vào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh Sửa Thông Tin Khoa</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Tên Khoa:</label>
                <input
                  type="text"
                  value={currentDepartment.departmentName}
                  onChange={(e) => setCurrentDepartment({ 
                    ...currentDepartment, 
                    departmentName: e.target.value 
                  })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">Lưu thay đổi</button>
                <button type="button" className="cancel-btn" onClick={handleModalClose}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
