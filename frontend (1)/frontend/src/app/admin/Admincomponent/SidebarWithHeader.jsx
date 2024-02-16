import { Link } from "react-router-dom";
import { PiVideoDuotone } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import logo from "../../../core/assets/abckidneylogo.png";

function SidebarWithHeader() {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-16 left-0 z-40 w-40 h-full pt-5 text-3xl transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 shadow-md"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <image src={logo}/>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdDashboard />
                <span className="ml-2 text-sm">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/courses"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiVideoDuotone />
                <span className="ml-2 text-sm">Courses</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SidebarWithHeader;
