import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import WelcomeToAdminDashboard from "../../utils/welcomeToAdminDashboard";

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-pink-500",
];

const getColor = (index) => {
  return colors[index % colors.length];
};

const CreateTechnician = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4); // Show 4 rows per page
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/create-technician",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      fetchTechnicians();
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/service/get-all-technicians",
        {
          params: {
            page,
            limit,
            search,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTechnicians(response.data.technicians);
      setTotalPages(response.data.totalPages); // Update total pages
    } catch (error) {
      toast.error(
        error.response?.data.message || "Failed to fetch technicians."
      );
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, [page, search, limit]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page on new search
  };

  return (
    <div>
    <div className="container mx-auto px-0 md:px-4 py-8 flex flex-col gap-8">
      <div className="w-full">
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create New Technician
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter technician's full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="technician@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Create a secure password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md"
            >
              Create Technician
            </button>
          </form>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Technicians List
          </h2>
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search technicians..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {technicians.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No technicians available.
            </div>
          ) : (
            technicians.map((technician, index) => (
              <Link
                to={`/admin-dashboard/get-technicion/${technician.id}`}
                key={technician.id} // Use technician's ID as the key
                className="text-blue-600"
              >
                <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg my-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 ${getColor(
                        index
                      )} rounded-full flex items-center justify-center`}
                    >
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">{technician.name}</h4>
                      <p className="text-sm text-gray-500">
                        {technician.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-600">
                      {new Date(technician.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400">Joined</p>
                  </div>
                </div>
              </Link>
            ))
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1} // Disable if on the first page
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Move to the previous page
              className={`px-4 py-2 rounded-md ${
                page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300"
              }`}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages} // Disable if on the last page
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} // Move to the next page
              className={`px-4 py-2 rounded-md ${
                page === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateTechnician;
