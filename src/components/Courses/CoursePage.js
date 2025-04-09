import React, { useState, useEffect } from 'react';
import AddCourse from './AddCourse';
import CourseList from './CourseList';
import { getCourses } from '../../api';
import './CoursePage.css';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="course-page">
      <h1>Quản Lý Khóa Học</h1>
      <AddCourse onCourseAdded={() => window.location.reload()} />
      <CourseList courses={courses} onCourseUpdated={fetchCourses} />
    </div>
  );
};

export default CoursePage;