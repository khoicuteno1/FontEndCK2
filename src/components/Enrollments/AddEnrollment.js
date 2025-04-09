import { useState, useEffect } from "react";
import { addEnrollments, getStudents, getCourses } from "../../api";

export default function AddEnrollment({ onEnrollmentAdded }) {
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    semester: "",  // Thêm trường semester vào formData
    enrollDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await getStudents();
        const coursesData = await getCourses();
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setFormData({ ...formData, courseId });

    // Tìm khóa học được chọn và cập nhật học kỳ tương ứng
    const selectedCourse = courses.find(course => course.id === parseInt(courseId));
    if (selectedCourse) {
      setFormData(prevData => ({
        ...prevData,
        semester: selectedCourse.semester,  // Tự động điền học kỳ
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Kiểm tra trùng lặp trước khi thêm ghi danh
      const checkDuplicateResponse = await addEnrollments(formData);
      if (checkDuplicateResponse) {
        alert("Thành công!");
        onEnrollmentAdded();
        setLoading(false);
        return; // Dừng lại nếu có trùng lặp
      }
  
      // Nếu không có trùng lặp, tiếp tục thêm ghi danh
      await addEnrollments(formData);
  
      // Thông báo thành công
      alert("Thêm ghi danh thành công!");
  
      // Reset form sau khi thêm thành công
      setFormData({ studentId: "", courseId: "", semester: "", enrollDate: "" });
  
      // Cập nhật danh sách sau khi thêm
      onEnrollmentAdded();
  
    } catch (error) {
      alert("Trùng khóa học!");
      console.error(error);
    }
    
    setLoading(false);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm Ghi Danh</h2>

      <div>
        <label>Sinh Viên:</label>
        <select name="studentId" value={formData.studentId} onChange={handleChange} required>
          <option value="">Chọn sinh viên</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.id})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Khóa Học:</label>
        <select name="courseId" value={formData.courseId} onChange={handleCourseChange} required>
          <option value="">Chọn khóa học</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Học Kỳ:</label>
        <input
          type="text"
          name="semester"
          value={formData.semester}
          readOnly  // Học kỳ sẽ được tự động điền dựa trên khóa học
        />
      </div>

      <div>
        <label>Ngày Ghi Danh:</label>
        <input
          type="date"
          name="enrollDate"
          value={formData.enrollDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Đang thêm..." : "Thêm Ghi Danh"}
      </button>
    </form>
  );
}
