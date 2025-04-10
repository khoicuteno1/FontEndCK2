import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse, updateCourse } from '../../api';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [, setEditCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({
    id: '',
    courseName: '',
    credits: '',
    semester: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa khóa học:', error);
    }
  };

  const openEditModal = (course) => {
    setEditCourse(course);
    setUpdatedCourse({
      id: course.id,
      courseName: course.courseName,
      credits: course.credits,
      semester: course.semester,
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateCourse(updatedCourse.id, updatedCourse);
      setCourses(
        courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
      );
      setShowModal(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật khóa học:', error);
    }
  };

  return (
    <div>
      <h2>Danh Sách Khóa Học</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Tên Khóa Học</th>
            <th>Tín Chỉ</th>
            <th>Học kỳ</th>
            <th>Khoa</th>
            <th>Số Sinh Viên Đăng Ký</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.courseName}</td>
                <td>{course.credits}</td>
                <td>{course.semester}</td>
                <td>{course.departmentName || 'Không có'}</td>
                <td>{course.studentCount || 0}</td>
                <td>
                  <button className="icon-button" onClick={() => openEditModal(course)}>
                    <FiEdit />
                  </button>
                  <button className="icon-button delete" onClick={() => handleDelete(course.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không có khóa học nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh Sửa Khóa Học</h3>
            <label>Tên Khóa Học</label>
            <input
              type="text"
              name="courseName"
              value={updatedCourse.courseName}
              onChange={handleEditChange}
              required
            />
            <label>Tín Chỉ</label>
            <input
              type="number"
              name="credits"
              value={updatedCourse.credits}
              onChange={handleEditChange}
              required
              min="0"
            />
            <label>Học Kỳ</label>
            <select
              name="semester"
              value={updatedCourse.semester}
              onChange={handleEditChange}
              required
            >
              <option value="">Chọn học kỳ</option>
              <option value="1">Học Kỳ 1</option>
              <option value="2">Học Kỳ 2</option>
              <option value="3">Học Kỳ 3</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleUpdate}>Lưu</button>
              <button className="cancel" onClick={() => setShowModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
