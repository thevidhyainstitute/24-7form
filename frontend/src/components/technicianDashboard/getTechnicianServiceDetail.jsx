import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetTechnicianServiceDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [serviceDetail, setServiceDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGetServiceDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.jobcard.24x7pestcontrol.in/api/service/get-service/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServiceDetail(response.data);
      } catch (error) {
        console.error("Error fetching service details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGetServiceDetail();
  }, [id, token]);

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://api.jobcard.24x7pestcontrol.in/api/service/report-pdf/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = `ServiceDetails_${id}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center text-lg font-semibold mt-8">
        Loading service details...
      </div>
    );
  if (!serviceDetail)
    return (
      <div className="text-center text-lg font-semibold mt-8 text-red-500">
        Failed to load service details.
      </div>
    );

  const {
    address,
    branchName,
    createdAt,
    customerFeedback,
    customerName,
    customerSignature,
    customerPhoto,
    serialNo,
    serviceDate,
    serviceTimeFrom,
    serviceTimeTo,
    technicianName,
    technicianSignature,
  } = serviceDetail.data;

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="text-center py-8 bg-green-500 text-white rounded mb-6">
        <h1 className="text-3xl font-semibold">Service Created Successfully!</h1>
        <p className="text-lg mt-2">The service details are as follows:</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Service Detail
        </h2>

        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
          <p>
            <span className="font-medium">Name:</span> {customerName}
          </p>
          <p>
            <span className="font-medium">Feedback:</span> {customerFeedback}
          </p>
          <p>
            <span className="font-medium">Address:</span> {address}
          </p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Service Information</h3>
          <p>
            <span className="font-medium">Serial No:</span> {serialNo}
          </p>
          <p>
            <span className="font-medium">Branch Name:</span> {branchName}
          </p>
          <p>
            <span className="font-medium">Service Date:</span>{" "}
            {new Date(serviceDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Service Time:</span> {serviceTimeFrom}{" "}
            - {serviceTimeTo}
          </p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Technician Information</h3>
          <p>
            <span className="font-medium">Name:</span> {technicianName}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Customer Signature</h3>
            <img
              src={customerSignature}
              alt="Customer Signature"
              className="w-full max-w-xs border rounded"
            />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Technician Signature</h3>
            <img
              src={technicianSignature}
              alt="Technician Signature"
              className="w-full max-w-xs border rounded"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <h3 className="text-lg font-medium mb-2">Customer Photo</h3>
          <img
            src={customerPhoto}
            alt="Customer Photo"
            className="w-full max-w-xs h-auto object-cover border rounded"
          />
        </div>

        <p className="text-right text-sm text-gray-500 mt-4">
          <span className="font-medium">Created At:</span>{" "}
          {new Date(createdAt).toLocaleString()}
        </p>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetTechnicianServiceDetail;
