import React, { useState, useEffect } from 'react';
import { addCourse, getDepartments, getCourses } from '../../api';

const AddCourse = ({ onCourseAdded }) => {
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState(0);
  const [semester, setSemester] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const deptData = await getDepartments();
      setDepartments(deptData);
      const courseData = await getCourses();
      setCourses(courseData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (courses.some(course => course.courseName.toLowerCase() === courseName.toLowerCase())) {
      alert('Khóa học đã tồn tại! Vui lòng nhập tên khác.');
      return;
    }
    
    const newCourse = { courseName, credits, semester, departmentId };
    try {
      await addCourse(newCourse);
      alert('Khóa học đã được thêm thành công!');
      onCourseAdded();
      setCourseName('');
      setCredits(0);
      setSemester('');
      setDepartmentId('');
      const updatedCourses = await getCourses();
      setCourses(updatedCourses);
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm khóa học!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Tên Khóa Học:</label>
      <input 
        value={courseName} 
        onChange={(e) => setCourseName(e.target.value)} 
        required 
        placeholder="Nhập tên khóa học"
      />

      <label>Số Tín Chỉ:</label>
      <input 
        type="number" 
        value={credits} 
        onChange={(e) => setCredits(Number(e.target.value))} 
        required 
        min="0"
      />

      <label>Học Kỳ:</label>
      <select value={semester} onChange={(e) => setSemester(e.target.value)} required>
        <option value="">Chọn học kỳ</option>
        <option value="1">Học Kỳ 1</option>
        <option value="2">Học Kỳ 2</option>
        <option value="3">Học Kỳ 3</option>
      </select>

      <label>Khoa:</label>
      <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
        <option value="">Chọn Khoa</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
        ))}
      </select>

      <button type="submit">Thêm Khóa Học</button>
    </form>
  );
};

export default AddCourse;
