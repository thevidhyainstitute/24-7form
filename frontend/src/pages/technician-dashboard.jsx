import React, { useContext } from "react";
import CreateServicesForm from "../components/technicianDashboard/createServicesForm";
import GetTechnicianServiceDetail from "../components/technicianDashboard/getTechnicianServiceDetail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContexts";

const TechnicianDashboard = () => {
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
    <div className="p-4">
      <div className="bg-white text-black p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        <h3 className="text-xl font-semibold">Welcome to the Dashboard</h3>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <Routes>
        <Route path="/" element={<CreateServicesForm />} />
        <Route
          path="/technician-service-detail/:id"
          element={<GetTechnicianServiceDetail />}
        />
      </Routes>
    </div>
  );
};

export default TechnicianDashboard;
