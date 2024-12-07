import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceTable from "./serviceTable";
import ChangePasswordModal from "./changePasswordModal";
import axios from "axios";
import WelcomeToAdminDashboard from "../../utils/welcomeToAdminDashboard";

const Dashboard = () => {
  const [technicians, setTechnicians] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/service/get-all-technicians",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTechnicians(response.data.technicians);
    } catch (error) {
      setError(error.response?.data.message || "Failed to fetch technicians.");
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-0">
      {/* Service Table */}
      <div className="overflow-x-auto">
        <ServiceTable />
      </div>
    </div>
  );
};

export default Dashboard;
