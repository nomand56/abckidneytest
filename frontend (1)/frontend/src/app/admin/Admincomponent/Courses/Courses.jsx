import { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard.jsx";
import SidebarWithHeader from "../SidebarWithHeader.jsx";
import AddCourseModal from "./AddCourseForm.jsx";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
const Courses = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { courses, fetchCourses } = useContext(AdminContext)
  const handleModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
    <div className="w-1/4" >
      <SidebarWithHeader />
      </div>
      <div className="container mx-auto mt-10 w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Courses</h1>
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setModalIsOpen(true)}
          >
            Add Course
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>
        <AddCourseModal isOpen={modalIsOpen} handleModal={handleModal} />
      </div>
    </>
  );
};

export default Courses;
