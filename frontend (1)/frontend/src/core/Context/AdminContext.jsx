import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authOptions } from "../../utils/index.js";
import { apiUrl } from "../../utils/config.js";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [students, setStudents] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/getAllSection`, authOptions);
      setCourses(response.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/getAllUsers`,
        authOptions
      );
      setStudents(response.data)
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const updateCourse = async (formData) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${apiUrl}/api/v1/updateSection/${formData.id}`,
        formData,
        authOptions
      );
      toast.success("Course updated successfully");
      setCourses(courses.map((course) => {
        if (course._id === formData.id) {
          return {

            title: course.title,
            description: course.description,
            ...formData
          }
        }
        fetchCourses();
        return course;
      }));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const updateChapter = async (formData) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${apiUrl}/api/v1/updateChapter/${formData.id}`,
        formData,
        authOptions
      );
      toast.success("Chapter updated successfully");
      setChapters(chapters.map((chapter) => {
        if (chapter._id === formData.id) {
          return {
            _id: chapter._id,
            title: chapter.title,
            description: chapter.description,
            ...formData
          }
        }

        return chapter;

      }));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  const updateUser = async (formData) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${apiUrl}/api/v1/updateChapter/${formData.id}`,
        formData,
        authOptions
      );

      toast.success("User updated successfully");
      setStudents(students.map((student) => {
        if (student._id === formData.id) {
          return {
            email: student.email,
            ...formData
          }
        }
        return student;
      }));

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const deleteUser = async (userId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/v1/deleteUser/${userId}`, authOptions);
      setStudents(students.filter((student) => student._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  const removeQuiz = async (quizId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/v1/deleteQuiz/${quizId}`,
        authOptions
      );

      fetchAllQuiz();
    } catch (error) {
      toast.error("error deleting quiz");
    } finally {
      setIsLoading(false);
    }
  }
  const fetchAllQuiz = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/getAllQuiz`,
        authOptions
      );
      setQuiz(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCourse = async (courseId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/v1/section/${courseId}`, authOptions);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchChapters = async (courseId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/chapters/${courseId}`,
        authOptions
      );

      if (response.status === 404) {
        console.log("Chapters not found for courseId:", courseId);
        setChapters([]);
      } else if (response.data !== null) {
        setChapters(response.data.chapters);
      }
    } catch (error) {
      if (error.response.status === 404) {
        return toast.error("No chapters found for this course");
      }
      toast.error("Error fetching chapters. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  // Create a new chapter
  const createChapter = async (chapter) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/addChapter`,
        chapter,
        authOptions
      );
      toast.success("Chapter created successfully");

      setChapters([...chapters, response.data]);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChapter = async (chapterId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/v1/chapter/${chapterId}`, authOptions);
      setChapters(chapters.filter((chapter) => chapter._id !== chapterId));
      toast.success("Chapter deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");

    } finally {
      setIsLoading(false);
    }
  };

  const fetchChapterById = async (chapterId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://example.com/api/chapters/${chapterId}`
      );
      return response.data;
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteLecture = async (lectureId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/v1/deleteLecture/${lectureId}`, authOptions);
      setLectures(lectures.filter((lecture) => lecture._id !== lectureId));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  // Create a new course
  const createCourse = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/addSection`,
        formData,
        authOptions
      );
      toast.success("Course created successfully");
      setCourses([...courses, response.data]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const addQuiz = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/addQuiz`,
        formData,
        authOptions
      );
      setQuiz([...quiz, response.data]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  const uploadLecture = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/addLecture`,
        formData,
        authOptions
      );
      return response.data;
    } catch (error) {
      toast.error("error uploading lecture");
    } finally {
      setIsLoading(false);
    }
  }


  const fetchLectures = async (chapterId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/getLectures/${chapterId}`,
        authOptions
      );
      if (response.data !== null) {
        setLectures(response.data);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <AdminContext.Provider
      value={{
        courses,
        chapters,
        isLoading,
        fetchCourses,
        deleteCourse,
        fetchChapters,
        createChapter,
        deleteChapter,
        fetchChapterById,
        createCourse,
        uploadLecture,
        getAllUsers,
        fetchLectures,
        lectures,
        addQuiz,
        removeQuiz,
        fetchAllQuiz,
        quiz,
        updateCourse,
        updateChapter,
        deleteLecture,
        updateUser,
        students,
        deleteUser
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;