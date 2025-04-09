import { useEffect, useState } from "react";
import { getEnrollments, deleteEnrollments, updateEnrollments } from "../../api"; // API gọi dữ liệu
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./EnrollmentList.css"; // Import file CSS

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newGrade, setNewGrade] = useState("");

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const data = await getEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách ghi danh:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Xóa ghi danh
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa ghi danh này?");
    if (!confirmDelete) return;

    try {
      await deleteEnrollments(id);
      setEnrollments(enrollments.filter((en) => en.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa ghi danh:", error);
    }
  };

  // Chỉnh sửa điểm số
  const handleEdit = (id, currentGrade) => {
    setEditingId(id);
    setNewGrade(currentGrade || ""); // Điểm mặc định nếu chưa có
  };

  // Lưu điểm mới
  const handleSave = async (id) => {
    const gradeValue = parseFloat(newGrade);
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
      alert("Điểm số phải nằm trong khoảng từ 0 đến 10");
      return;
    }

    try {
      await updateEnrollments(id, { grade: gradeValue });
      setEnrollments(enrollments.map((en) =>
        en.id === id ? { ...en, grade: gradeValue } : en
      ));
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật điểm:", error);
    }
  };

  return (
    <div className="enrollment-container">
      <h1>Danh Sách Ghi Danh</h1>
      {loading ? (
        <p className="loading-text">Đang tải dữ liệu...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ Tên Sinh Viên</th>
              <th>Khóa Học</th>
              <th>Điểm</th>
              <th>Ngày ghi danh</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.studentId}</td>
                <td>
                  {enrollment.Student?.firstName} {enrollment.Student?.lastName}
                </td>
                <td>{enrollment.Course?.courseName}</td>
                <td>
                  {editingId === enrollment.id ? (
                    <input
                      type="number"
                      value={newGrade}
                      onChange={(e) => setNewGrade(e.target.value)}
                      min="0"
                      max="10"
                    />
                  ) : (
                    enrollment.grade || "Chưa có điểm"
                  )}
                </td>
                <td>{new Date(enrollment.enrollDate).toLocaleDateString("vi-VN")}</td>
                <td>
                  {editingId === enrollment.id ? (
                    <button onClick={() => handleSave(enrollment.id)}>Lưu</button>
                  ) : (
                    <button onClick={() => handleEdit(enrollment.id, enrollment.grade)}>
                      <FiEdit />
                    </button>
                  )}
                  <button onClick={() => handleDelete(enrollment.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
