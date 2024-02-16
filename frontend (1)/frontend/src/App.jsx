import { ToastContainer } from "react-toastify";
import Footer from "./app/Components/Footer/Footer.jsx";
import { AuthProvider } from "./core/Context/AuthContext.jsx";
import Navbar from "./app/Components/Navbar/Navbar.jsx";
import RouteFiles from "./app/Route/Route.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./core/Context/AdminContext.jsx";
import { StudentContextProvider } from "./core/Context/StudentContext.jsx";

function App() {



  return (
    <div className="font-sans">
      <BrowserRouter>
        <AuthProvider>

          <StudentContextProvider>
            <AdminContextProvider>

              <Navbar />
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
              />
              <RouteFiles />
              <Footer />
            </AdminContextProvider>
          </StudentContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
