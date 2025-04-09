import { useState, useEffect } from "react";
import { getEnrollments } from "../../api";
import AddEnrollment from "./AddEnrollment";
import EnrollmentList from "./EnrollmentList"; // Import component mới

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch danh sách Enrollments
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

  // Load dữ liệu khi vào trang
  useEffect(() => {
    fetchEnrollments();
  }, []);

  return (
    <div>
      <h1>Quản Lý Ghi Danh</h1>

      {/* Form thêm ghi danh */}
      <AddEnrollment onEnrollmentAdded={() => window.location.reload()} />

      {/* Danh sách ghi danh */}
      <EnrollmentList enrollments={enrollments} loading={loading} />
    </div>
  );
}
