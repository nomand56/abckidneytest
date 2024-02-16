/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/config.js';
import { authOptions } from '../../utils/index.js';
export const StudentContext = createContext();

export const StudentContextProvider = ({ children }) => {

  const [chapters, setChapters] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const studentChapters = async (courseId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/chapters/${courseId}`,
        authOptions
      );
      if (response.data !== null) {
        setChapters(response.data.chapters);
        setLectures(response.data.videos);
        setQuiz(response.data.quiz);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const fetchStudentCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/getAllSection`,
        authOptions
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    isLoading,
    chapters,
    fetchStudentCourses,
    studentChapters,
    courses,
    quiz,
    lectures,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};