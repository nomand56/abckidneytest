import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../core/Context/AuthContext.jsx";
import logo from "../../../core/assets/abckidneylogo.png";

import { MoonLoader } from "react-spinners";
function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, } = useAuth();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  function loadingState() {
    setLoading(false);
  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill all the fields.");
      return;
    }
    login(formData, loadingState);
    setFormData({
      email: "",
      password: "",
    });
    
  };
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {loading && <MoonLoader color="#30528f" />}
      </div>
    );
  return (
    <div className=" flex max-lg:flex-col bg-gradient-to-r rounded-lg from-blue-800 to-blue-600 bg-white border px-10 py-10 mx-auto container">
      <div className="w-1/2 max-lg:w-auto bg-white rounded-lg">
        <div className="text-center py-4 text-xl text-black  font-bold " >
        sign in 
        </div>
        <div className=" rounded-b-lg py-12 px-4 lg:px-24 ">
          <p className="text-center text-xl text-black  font-bold">
            
        <img  src={logo} style={{width:'122px', justifyContent:'center', alignItems:"center"}}/>

          </p>
          <form className="mt-6" onSubmit={handleSignIn}>
            <div className="relative mt-5">
            <h3 className="font-bold">Email</h3>

              <input
                className="appearance-none border-2 pl-12 border-gray-100 hover:border-blue-900 hover:border-2 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-lg w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="email"
                type="text"
                placeholder="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="absolute mt-6 ml-4 inset-y-0 flex items-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7  text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <div className="relative mt-3">
              <h3 className="font-bold">Password</h3>
              <input
                className="appearance-none border-2  pl-12 border-gray-100 hover:border-blue-900 hover:border-2 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-lg w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="absolute mt-6  left-0 inset-y-0 flex items-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                className="text-white w-full py-2 px-4 bg-blue-700 uppercase rounded-lg hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="text-left mt-4">
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-50  "
              style={{
                color: "#30528f",
                fontSize: "20px",
                textDecoration: "underline",
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="w-3/4 max-lg:w-auto bg-blue-700 rounded-lg">
      <div className="mt-44 text-white text-left px-10 transition-transform duration-500 ease-in-out transform translate-y-0 hover:translate-y-[-10px]">
  <h1 className="text-5xl font-bold text-left tra transition-transform duration-500 ease-in-out transform translate-y-0">Welcome Back :)</h1>
  <p className="text-lg mt-3 text-gray-200 transition-transform duration-500 ease-in-out transform translate-y-0">To Keep Connected With Us Please Login with your personal Info</p>
</div>


      </div>
    </div>
  );
}

export default Login;
