import { useContext, useEffect, useState } from "react";
import SidebarWithHeader from "../SidebarWithHeader.jsx";
import { DashboardTable } from "./dashboardTable.jsx";
import { MoonLoader } from "react-spinners";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import Pagination from "../../../Components/Pagination/Pagination.jsx";
import { MdMenuOpen } from "react-icons/md";

function AdminDashboard() {
  const { getAllUsers, isLoading, students } = useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [studentsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MoonLoader color="#30528f" />
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className={`w-full md:w-1/6  ${
          isSidebarVisible ? "" : "max-lg:hidden"
        }`}
      >
        <SidebarWithHeader />
      </div>
      <div
        className={`w-full md:w-5/6 md:ml-2  ${
          isSidebarVisible ? "" : "max-md:w-full"
        }`}
      >
        <button className=" ml-28 md:hidden" onClick={toggleSidebar}>
          <MdMenuOpen className="w-36 h-10" />
        </button>
        <div className="mt-16 text-center ">
          <h1 className="text-3xl font-bold mb-6">User Admin Panel</h1>
          <div className="search-bar mb-4">
            <DashboardTable students={currentStudents} />
          </div>
          <Pagination
            studentsPerPage={studentsPerPage}
            totalStudents={students.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
