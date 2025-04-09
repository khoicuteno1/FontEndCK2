import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
  
};

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`${API_URL}/students/${studentId}`);
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/students/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};


//Courses

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(`${API_URL}/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await axios.delete(`${API_URL}/courses/${courseId}`);
    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

//Department

export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

export const addDepartment = async (departmentData) => {
  try {
    const response = await axios.post(`${API_URL}/departments`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Error adding departments:', error);
    throw error;
  }
};

export const updateDepartment = async (departmentId, departmentData) => {
  try {
    const response = await axios.put(`${API_URL}/departments/${departmentId}`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating departments:', error);
    throw error;
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    await axios.delete(`${API_URL}/departments/${departmentId}`);
    return true;
  } catch (error) {
    console.error('Error deleting departments:', error);
    throw error;
  }
};

//Enrollments

export const getEnrollments = async () => {
  try {
    const response = await axios.get(`${API_URL}/enrollments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }
};

export const addEnrollments = async (enrollmentsData) => {
  try {
    // Lấy danh sách tất cả các ghi danh đã có trong hệ thống
    const checkDuplicateResponse = await axios.get(`${API_URL}/enrollments`, {
      params: {
        courseId: enrollmentsData.courseId,  // Kiểm tra theo courseId của khóa học
      },
    });

    // Kiểm tra xem sinh viên đã ghi danh vào khóa học này chưa
    if (Array.isArray(checkDuplicateResponse.data)) {
      // Duyệt qua tất cả các ghi danh để kiểm tra
      for (const enrollment of checkDuplicateResponse.data) {
        if (enrollment.studentId === enrollmentsData.studentId) {
          // Nếu tìm thấy sinh viên đã ghi danh vào khóa học này
          throw new Error("Sinh viên đã ghi danh vào khóa học này.");
        }
      }
    }

    // Nếu không có trùng lặp, tiếp tục thêm ghi danh
    const response = await axios.post(`${API_URL}/enrollments`, enrollmentsData);
    return response.data;

  } catch (error) {
    console.error('Error adding enrollments:', error);
    throw error;
  }
};


export const updateEnrollments = async (departmentId, enrollmentsData) => {
  try {
    const response = await axios.put(`${API_URL}/enrollments/${departmentId}`, enrollmentsData);
    return response.data;
  } catch (error) {
    console.error('Error updating enrollments:', error);
    throw error;
  }
};

export const deleteEnrollments = async (departmentId) => {
  try {
    await axios.delete(`${API_URL}/enrollments/${departmentId}`);
    return true;
  } catch (error) {
    console.error('Error deleting enrollments:', error);
    throw error;
  }
};


