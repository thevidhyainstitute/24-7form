import React, { useEffect, useState } from "react";
import Sidebar from "../components/adminDashboard/sidebar";
import { Routes, Route, Link } from "react-router-dom";
import CreateTechnician from "../components/adminDashboard/createTechnician";
import Dashboard from "../components/adminDashboard/dashboard";
import GetSerivceDetail from "../components/adminDashboard/getServiceDetail";
import GetTechnicianDetail from "../components/adminDashboard/getTechnicianDetail";
import axios from "axios";
import { toast } from "react-toastify";
import WelcomeToAdminDashboard from "../utils/welcomeToAdminDashboard";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    serviceDate: "",
    customerName: "",
    address: "",
    serviceTimeFrom: "",
    serviceTimeTo: "",
    customerFeedback: "",
    technicianName: "",
    technicianSignature: "",
    customerSignature: "",
  });
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchLoggedInUserDetail = async () => {
      try {
        const response = await axios.get("https://api.jobcard.24x7pestcontrol.in/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserDetails(response.data.user);
        setFormData((prevState) => ({
          ...prevState,
          technicianName: response.data.user.name,
        }));
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching logged-in user details:", error);
        // toast.error("Failed to fetch user details.");
      }
    };

    fetchLoggedInUserDetail();
  }, []);

  return (
    <div className="grid gtid-cols-1 md:grid-cols-[minmax(240px,_20%)_1fr] h-auto mt-6">
      <Sidebar userDetails={userDetails} />
      <div className="p-4 overflow-auto h-[100vh]">
        <WelcomeToAdminDashboard />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="/create-technician" element={<CreateTechnician />} />
          <Route path="/get-service/:id" element={<GetSerivceDetail />} />
          <Route path="/get-technicion/:id" element={<GetTechnicianDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
