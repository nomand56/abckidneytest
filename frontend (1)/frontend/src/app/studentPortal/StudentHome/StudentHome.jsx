import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Studentcards from "./Studentcards.jsx";
import { faGraduationCap, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "../../../core/Context/StudentContext.jsx";

const StudentDashboard = () => {
  const { courses } = useContext(StudentContext);
  const history = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen mt-20 mb-96 md:p-8 lg:p-12 py-8">
      <header>
        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      </header>
      <main className="mt-4 md:mt-8 lg:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Student Syllabus</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Courses</h2>
              <ul>
                {courses.map((course, index) => (
                  <li
                    key={index}
                    className="font-bold my-4 text-lg border-b border-gray-300 rounded-lg transition duration-300 py-4 px-4 ease-in-out transform bg-gradient-to-r from-blue-500 to-blue-800 text-white hover:bg-blue-200 hover:scale-105"
                  >
                    <Link to={`/student/courses/${encodeURIComponent(course._id)}`}>
                      {`Course ${index + 1}: ${course.title}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-bold my-4 text-lg border-b border-gray-300 rounded-lg transition duration-300 py-4 px-4 ease-in-out transform bg-gradient-to-r from-blue-500 to-blue-800 text-white hover:bg-blue-200 hover:scale-105 ">
              <Link to="/student/profile" className="flex items-center">
                <div className="mr-4">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
                <div>
                  <span className="font-semibold text-xl">Student Profile</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="md:col-span-3 mx-4">
            <Studentcards />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
