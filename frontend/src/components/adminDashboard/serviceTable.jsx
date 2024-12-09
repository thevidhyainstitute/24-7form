import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [startingFrom, setStartingFrom] = useState("");
  const [endingTo, setEndingTo] = useState("");
  const [sortBy, setSortBy] = useState("serialNo");
  const [order, setOrder] = useState("desc");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, [currentPage, search, startingFrom, endingTo, sortBy, order]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://api.jobcard.24x7pestcontrol.in/api/service/get-all-service",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            limit: 3,
            search,
            startingFrom,
            endingTo,
            sortBy,
            order,
          },
        }
      );

      const { services, totalPages } = response.data;
      setServices(services);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching services:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized access! Redirecting to login.");
        localStorage.clear();
        window.location.href = "/";
      }
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(
        "https://api.jobcard.24x7pestcontrol.in/api/service/report-download",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sortBy,
            order,
            customerName: search,
            technicianName: search,
            startingFrom,
            endingTo,
          },
          responseType: "blob",
        }
      );

      toast.success("Service Report Downloaded Successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ServiceRecords.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download the report. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 md:p-6 lg:p-4">
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center md:justify-between">
        <input
          type="text"
          placeholder="Search by customer name or technician name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="date"
          value={startingFrom}
          onChange={(e) => setStartingFrom(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-auto w-[100%]"
        />
        <input
          type="date"
          value={endingTo}
          onChange={(e) => setEndingTo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-auto w-[100%]"
        />
        <button
          onClick={handleDownloadReport}
          className="p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 md:w-auto w-[100%]"
        >
          Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th
                onClick={() => handleSort("serialNo")}
                className="cursor-pointer border-b p-4 text-left font-medium text-gray-700 hover:text-blue-500"
              >
                Serial No{" "}
                {sortBy === "serialNo" && (order === "asc" ? "↑" : "↓")}
              </th>
              <th className="border-b p-4 text-left font-medium text-gray-700">
                Customer Name
              </th>
              <th
                onClick={() => handleSort("serviceDate")}
                className="cursor-pointer border-b p-4 text-left font-medium text-gray-700 hover:text-blue-500"
              >
                Service Date{" "}
                {sortBy === "serviceDate" && (order === "asc" ? "↑" : "↓")}
              </th>
              <th className="border-b p-4 text-left font-medium text-gray-700">
                Branch Name
              </th>
              <th className="border-b p-4 text-left font-medium text-gray-700">
                Technician Name
              </th>
              <th className="border-b p-4 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service.serialNo}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="p-4 border-b">{service.serialNo}</td>
                  <td className="p-4 border-b">{service.customerName}</td>
                  <td className="p-4 border-b">
                    {new Date(service.serviceDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b">{service.branchName}</td>
                  <td className="p-4 border-b">{service.technicianName}</td>
                  <td className="p-4 border-b">
                    <Link
                      to={`/admin-dashboard/get-service/${service.serialNo}`}
                      className="text-blue-600 hover:underline"
                    >
                      <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500 border-b"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="p-2 bg-gray-300 text-gray-600 rounded-lg shadow-sm hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="p-2 bg-gray-300 text-gray-600 rounded-lg shadow-sm hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceTable;
