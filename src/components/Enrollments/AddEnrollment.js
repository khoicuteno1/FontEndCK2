import { useState, useEffect } from "react";
import { addEnrollments, getStudents, getCourses } from "../../api";

export default function AddEnrollment({ onEnrollmentAdded }) {
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    semester: "",
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

        // Loại bỏ các khóa học bị trùng courseName
        const uniqueCourses = [];
        const courseNames = new Set();

        for (const course of coursesData) {
          if (!courseNames.has(course.courseName)) {
            courseNames.add(course.courseName);
            uniqueCourses.push(course);
          }
        }

        setStudents(studentsData);
        setCourses(uniqueCourses);
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

    const selectedCourse = courses.find(course => course.id === parseInt(courseId));
    if (selectedCourse) {
      setFormData(prevData => ({
        ...prevData,
        semester: selectedCourse.semester,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gửi form ghi danh
      const result = await addEnrollments(formData);

      if (result && result.success === false) {
        alert("Trùng khóa học!");
      } else {
        alert("Thêm ghi danh thành công!");
        setFormData({ studentId: "", courseId: "", semester: "", enrollDate: "" });
        onEnrollmentAdded();
      }

    } catch (error) {
      alert("Đã xảy ra lỗi khi thêm ghi danh!");
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
        {student.lastName + ' ' + student.firstName} (Mã SV: {student.id})
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
          readOnly
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
