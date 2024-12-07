import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/adminDashboard/changePasswordModal";
import { UserContext } from "../contexts/userContexts";

const WelcomeToAdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchUserDetails } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    await fetchUserDetails();
    navigate("/login");
  };

  return (
    <div>
      <div className="bg-white text-black p-4 sm:p-6 mb-6 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        {/* Welcome Text */}
        <h3 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
          Welcome to the Dashboard
        </h3>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row md:flex-row gap-2 sm:gap-4 md:gap-6 items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full sm:w-auto"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default WelcomeToAdminDashboard;
