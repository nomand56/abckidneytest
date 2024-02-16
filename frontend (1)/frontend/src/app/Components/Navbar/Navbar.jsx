import { useRef, useState } from "react";
import logo from "../../../core/assets/abckidneylogo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../core/Context/AuthContext.jsx";
import useOutsideClick from "../../../core/hooks/useOutsideClick.js";
import { MoonLoader } from "react-spinners";
function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const { user,handleLogout, loading } = useAuth();

  const modalRef = useRef();
  useOutsideClick(modalRef, () => {
    setUserMenuOpen(false);
  });



  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (mainMenuOpen) {
      setMainMenuOpen(false);
    }
  };

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
        </Link>
        <div className="flex md:order-2">
          {user && user.token ? (
            <div className="relative">
              <button
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"}
                  alt="user photo"
                />
              </button>
              <div
                className={`${userMenuOpen ? "block" : "hidden"
                  } z-10 bg-white divide-y absolute top-37px -right-14  divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                ref={modalRef}
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{`${user?.firstName}  ${user?.lastName} `}</div>
                  <div className="font-medium truncate">{user?.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  {user.role === "admin" ? (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/student/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Student Dashboard
                    </Link>
                  )}
                </ul>
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              style={{ color: "white" }}
              type="button"
              className=" bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={toggleMainMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${mainMenuOpen ? "block" : "hidden"
            } `}
          id="navbar-sticky"

        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 rounded "
                activeClassName="bg-blue-700 text-blue-700"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="block py-2 pl-3 pr-4 "
                activeClassName="bg-blue-700"
                aria-current="page"
              >
                About
              </NavLink>
            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
