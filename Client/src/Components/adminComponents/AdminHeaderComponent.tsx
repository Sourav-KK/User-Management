import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeaderComponent: React.FC = () => {
  const Nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handdleLogout = () => {
    localStorage.removeItem("adminToken");
    Nav("/adminlogin");
    // <Navigate to="/adminlogin" />
  };

  return (
    <header className="bg-gray-800 py-4 px-6 md:px-10 lg:px-16">
      <div className="flex items-center justify-between">
        <Link to={"/adminhome"}>
          <div className="flex items-center text-white hover:text-gray-300">
            Admin
          </div>
        </Link>
        <nav className="flex items-center md:block">
          <div className="md:hidden">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <ul
            className={`md:flex md:items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <a className="text-white hover:text-gray-300 px-4 block py-2">
                <Link to={"/admindashboard"}> Users</Link>
              </a>
            </li>
            <li>
              <a className="text-white hover:text-gray-300 px-4 block py-2"
                onClick={handdleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeaderComponent;
