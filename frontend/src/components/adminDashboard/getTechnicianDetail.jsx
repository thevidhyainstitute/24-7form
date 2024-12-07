import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetTechnicianDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [technicianDetail, setTechnicianDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGetServiceDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/service/get-technician/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTechnicianDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technician details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGetServiceDetail();
  }, [id, token]);

  if (loading)
    return (
      <div className="text-center text-lg font-semibold mt-8">
        Loading technician details...
      </div>
    );

  if (!technicianDetail)
    return (
      <div className="text-center text-lg font-semibold mt-8 text-red-500">
        Failed to load technician details.
      </div>
    );

  const { name, email, password, role, updatedAt, createdAt } =
    technicianDetail.data;

  return (
    <div className="mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Technician Detail
      </h1>

      {/* Technician Information Section */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Personal Information
        </h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {role}
          </p>
          <p>
            <span className="font-medium">Updated At:</span> {updatedAt}
          </p>
        </div>
      </div>

      {/* CreatedAt Timestamp */}
      <p className="text-right text-sm text-gray-500 mt-4">
        <span className="font-medium">Created At:</span>{" "}
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default GetTechnicianDetail;
