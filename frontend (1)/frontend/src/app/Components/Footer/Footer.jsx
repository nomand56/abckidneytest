import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-8 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to='/' className="text-teal-600">
              <img src="/abckidneylogo.png" className="w-48" alt="" />
            </Link>
           
          </div>
          <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-2 lg:pt-16">
            <div>
              <p className="font-medium text-gray-900">Services</p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <Link to='/student/dashboard' href="#" className="text-gray-700 transition hover:opacity-75">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link to='/about' className="text-gray-700 transition hover:opacity-75">
                    Company Review
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900">Company</p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <Link to='/about' className="text-gray-700 transition hover:opacity-75">
                    About
                  </Link>
                </li>
                <li>
                  <Link to='/about' className="text-gray-700 transition hover:opacity-75">
                    Meet the Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            © 2022. Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
