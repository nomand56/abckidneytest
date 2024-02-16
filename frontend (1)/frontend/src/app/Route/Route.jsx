import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import About from "../pages/About/About.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../Components/LoginForm/Login.jsx";
import SignupForm from "../Components/LoginForm/SignupForm.jsx";
import StudentPortal from "../studentPortal/StudentPortal.jsx";
import AdminDashboard from "../admin/Admincomponent/Dashboard/AdminDashboard.jsx";
import QuizSection from "../admin/Admincomponent/Quiz/index.jsx";
import PlayerAd from "../admin/Admincomponent/AddLectures/PlayerAd.jsx";
import StudentProfile from "../studentPortal/StudentHome/Studentprofile.jsx";
import AddCourseForm from "../admin/Admincomponent/Courses/AddCourseForm.jsx";
import Courses from "../admin/Admincomponent/Courses/Courses.jsx";
import { PrivateRoute } from "../../core/PrivateRoute.jsx";
import Chapters from "../admin/Admincomponent/Chapters/Chapters.jsx";
import Resources from "../admin/Admincomponent/AddResources/Resources.jsx";
import CourseDetails from "../studentPortal/StudentHome/CourseDetails.jsx";
import AdminRoute from "../../core/AdminRoute.jsx";
import OpenAccess from "../OpenAccess/OpenAccess.jsx";


import NotFound from "../pages/notFound/notFound.jsx";

function RouteFiles() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/openAccess" element={<OpenAccess />} />
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="addquiz" element={<QuizSection />} />
        <Route path="addlecture" element={<PlayerAd />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<Chapters />} />
        <Route path="courses/addCourse" element={<AddCourseForm />} />
        <Route path="content" element={<Resources />} />
        <Route path="chapters/:chapterId" element={<Resources />} />
      </Route>
      <Route path="/student" element={<PrivateRoute />}>
        <Route path="dashboard" element={<StudentPortal />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


export default RouteFiles;
