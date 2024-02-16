import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../core/Context/AuthContext.jsx";
import logo from "../../../core/assets/abckidneylogo.png";

import { MoonLoader } from "react-spinners";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [id]: newValue });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    if (!isValidPassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all the fields.");
      return;
    }

    await signup(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+=-]/.test(password)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#30528F" />
      </div>
    );
  }

  return (
    <div className=" flex max-lg:flex-col bg-gradient-to-r rounded-lg from-blue-800 to-blue-600 bg-white border px-10 py-10 mx-auto container">
      <div className=" w-1/2  ">
        <div className=" max-lg:w-auto bg-white rounded-lg">
          <div className="text-center  px-4 py-24  ">
            <div className="text-center py-4 text-xl text-black  font-bold ">
              Sign up
            </div>
            <p className="text-center text-xl text-black  font-bold">
              <img
                src={logo}
                style={{
                  width: "122px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </p>
            <form className="mt-6" onSubmit={handleCreateAccount}>
              {" "}
              <div className="relative">
                {" "}
                <input
                  className="appearance-none border-2 pl-12  border-blue-100 shadow-sm focus:shadow-md focus:placeholder-blue-600 hover:border-blue-700 transition rounded-lg w-full py-3 mt-4 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <div className="absolute left-3 inset-y-0 flex items-center">
                  <FaUser />
                </div>{" "}
              </div>{" "}
              <div className="relative mt-2">
                {" "}
                <input
                  className="appearance-none border-2 pl-12  border-blue-100 shadow-sm focus:shadow-md focus:placeholder-blue-600 hover:border-blue-700 transition rounded-lg w-full py-3  text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="last Name"
                  value={formData.lastName}
                  required="required"
                  onChange={handleInputChange}
                />
                <div className="absolute left-3 inset-y-0 flex items-center">
                  <FaUser />
                </div>{" "}
              </div>{" "}
              <div className="relative mt-3">
                {" "}
                <input
                  className="appearance-none border-2 pl-12  border-blue-100 shadow-sm focus:shadow-md focus:placeholder-blue-600 hover:border-blue-700 transition rounded-lg w-full py-3  text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="E Mail Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="absolute left-3 inset-y-0 flex items-center">
                  {" "}
                  <FaEnvelope />
                </div>{" "}
              </div>{" "}
              <div className="relative mt-3">
                {" "}
                <input
                  className="appearance-none border-2 pl-12  border-blue-100 shadow-sm focus:shadow-md focus:placeholder-blue-600 hover:border-blue-700 transition rounded-lg w-full py-3  text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="absolute left-3 inset-y-0 flex items-center">
                  {" "}
                  <FaLock />
                </div>{" "}
              </div>{" "}
              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white w-full py-2 px-4 bg-blue-700 uppercase rounded-lg hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Create Account
                </button>
              </div>{" "}
            </form>{" "}
            <p className="text-left mt-4">
              If You Have An Account?{" "}
              <Link
                to="/login"
                className="text-indigo-50  "
                style={{
                  color: "#30528f",
                  fontSize: "20px",
                  textDecoration: "underline",
                }}
              >
                Sign In
              </Link>
            </p>
          </div>{" "}
        </div>
      </div>
      <div className="w-3/4 max-lg:w-auto bg-blue-700 rounded-lg">
        <div className="mt-44 text-white  text-left px-10 transition-transform duration-500 ease-in-out transform translate-y-0 hover:translate-y-[-10px]">
          <h1 className="text-5xl font-bold text-left tra transition-transform duration-500 ease-in-out transform translate-y-0">
            ABCKidney
            <br /> Unlock Kidney Wisdom – Welcome & Sign Up Today!
          </h1>
          <p className="text-lg mt-3 text-gray-200 transition-transform duration-500 ease-in-out transform translate-y-0">
            Discover the realm of kidney health education. ABCKidney: Your
            premier source for comprehensive information and insights on kidneys
            – empowering you with knowledge for a healthier life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
