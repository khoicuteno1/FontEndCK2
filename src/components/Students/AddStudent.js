import React, { useState } from 'react';
import { addStudent } from '../../api';
import './AddStudent.css'; // Import CSS
const AddStudent = ({onStudentAdded}) => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M',
    address: '',
    phoneNumber: '',
    email: '',
    enrollmentDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(student); // Sử dụng hàm addStudent
      onStudentAdded()
      alert('Thêm sinh viên thành công!');
    } catch (error) {
      alert('Lỗi khi thêm sinh viên: ' + (error.response?.data?.message || error.message));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm Sinh Viên</h2>
      <input name="firstName" placeholder="Họ" onChange={handleChange} required />
      <input name="lastName" placeholder="Tên" onChange={handleChange} required />
      <input name="dateOfBirth" type="date" onChange={handleChange} required />
      <select name="gender" onChange={handleChange}>
        <option value="M">Nam</option>
        <option value="F">Nữ</option>
      </select>
      <input name="address" placeholder="Địa Chỉ" onChange={handleChange} />
      <input name="phoneNumber" placeholder="SĐT" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="enrollmentDate" type="date" onChange={handleChange} required />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default AddStudent;
