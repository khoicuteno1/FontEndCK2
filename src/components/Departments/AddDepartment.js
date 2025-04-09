import React, { useState, useEffect } from 'react';
import { addDepartment, getDepartments } from '../../api';

const AddDepartment = ({ onAdd }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (departments.some(dept => dept.departmentName.toLowerCase() === departmentName.toLowerCase())) {
      alert('Tên khoa đã tồn tại! Vui lòng nhập tên khác.');
      return;
    }
    
    try {
      const newDepartment = await addDepartment({ departmentName });
      onAdd(newDepartment);
      setDepartmentName('');
      setDepartments([...departments, newDepartment]);
      alert('Thêm khoa mới thành công!');
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Có lỗi xảy ra khi thêm khoa mới!');
    }
  };

  return (
    <div className="add-department-form">
      <h2>Thêm Khoa Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="departmentName">Tên khoa:</label>
          <input
            id="departmentName"
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            placeholder="Nhập tên khoa"
          />
        </div>

        <button type="submit">Thêm Khoa</button>
      </form>
    </div>
  );
};

export default AddDepartment;
