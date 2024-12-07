import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContexts";
import { toast } from "react-toastify";

const Header = () => {
  const { userDetails, logout, fetchUserDetails } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate()

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  const handleLogout = async() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    await fetchUserDetails();
    navigate("/login");
  };


  return (
    <header className="bg-white shadow-md text-black border rounded-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        
        {/* Logo Section */}
        <Link to="/">
        <div className="flex items-center">
          <img
            src="./24x7-pestControl.png"
            alt="pest-control"
            className="h-16"
          />
        </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="space-x-10">
          <ul className="flex space-x-10">
            {isHomePage && userDetails ? (
              // Show Logout button only on the home page if logged in
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full sm:w-auto"              >
                Logout
              </button>
            ) : (
              !userDetails && (
                <p className="font-bold text-xl">
                  <Link to="/login">Login</Link>
                </p>
              )
            )}
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
