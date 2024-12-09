import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!email || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (role !== "admin") {
        toast.error("Only Admins can change password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://api.jobcard.24x7pestcontrol.in/api/auth/change-password",
        { email, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || "Password changed successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setEmail("");
      setNewPassword("");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <p className="text-sm text-gray-600 mb-4">
            * Only Admin can change their password or a technician's password.
          </p>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {loading ? "Processing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
