import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WelcomeToAdminDashboard from "../../utils/welcomeToAdminDashboard";

const GetServiceDetail = () => {
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
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setServiceDetail(response.data);
        console.log(response.data, "serviceDetail");
      } catch (error) {
        console.error("Error fetching service details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetServiceDetail();
  }, [id, token]);

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
    serialNo,
    serviceDate,
    serviceTimeFrom,
    serviceTimeTo,
    technicianName,
    technicianSignature,
    customerPhoto,
    observationBySms,
    pestTrapCatches,
    servicesCarriedOut
  } = serviceDetail.data;

  // First decode the string
const decodedString = JSON.parse(servicesCarriedOut); // Decode the string

// Then parse the decoded string to get the actual object
const parsedServicesCarriedOut = JSON.parse(decodedString);

// Function to format the service names to be more readable
const formatServiceName = (service) => {
  return service
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

  return (
    <div>
    <WelcomeToAdminDashboard />

    <div className="mx-auto bg-white shadow-lg rounded-lg p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Service Detail</h1>

      {/* Customer Information */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <p>
          <span className="font-medium">Name:</span> {customerName}
        </p>
        <p>
          <span className="font-medium">Feedback:</span> {customerFeedback}
        </p>
        <p>
            <span className="font-medium">Observation By Sms:</span> {observationBySms}
          </p>
          <p>
            <span className="font-medium">Pest Trap Catches:</span> {pestTrapCatches}
          </p>
        <p>
          <span className="font-medium">Address:</span> {address}
        </p>
      </div>

      {/* Service Information */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Service Information</h2>
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
          <span className="font-medium">Service Time:</span> {serviceTimeFrom} - {serviceTimeTo}
        </p>
      </div>

       {/* Displaying Services Carried Out */}
       {/* <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Services Carried Out</h3>
          <div>
            {Object.entries(parsedServicesCarriedOut).map(([serviceKey, serviceValue]) => (
              <p key={serviceKey}>
                <span className="font-medium">{formatServiceName(serviceKey)}:</span>{" "}
                {serviceValue ? "Yes" : "No"}
              </p>
            ))}
          </div>
        </div> */}

<div className="border-b pb-4 mb-4">
  <h3 className="text-xl font-semibold mb-2">Services Carried Out</h3>
  <div>
    {Object.entries(parsedServicesCarriedOut)
      .filter(([serviceKey, serviceValue]) => serviceValue === true) // Only include true values
      .map(([serviceKey]) => (
        <p key={serviceKey}>
          <span className="font-medium">{formatServiceName(serviceKey)}</span>
        </p>
      ))}
  </div>
</div>


      {/* Technician Information */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Technician Information</h2>
        <p>
          <span className="font-medium">Name:</span> {technicianName}
        </p>
      </div>

      {/* Customer Photo */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Photo</h2>
        <img
          src={customerPhoto}
          alt="Customer"
          className="w-full max-w-md h-auto rounded-lg mx-auto"
        />
      </div>

      {/* Signatures */}
      <div className="flex flex-wrap justify-between gap-4 mt-6">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-2">Customer Signature</h3>
          <img
            src={customerSignature}
            alt="Customer Signature"
            className="w-full max-w-[25rem] h-auto rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-2">Technician Signature</h3>
          <img
            src={technicianSignature}
            alt="Technician Signature"
            className="w-full max-w-[25rem] h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Created At */}
      <p className="text-right text-sm text-gray-500 mt-4">
        <span className="font-medium">Created At:</span>{" "}
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
    </div>
  );
};

export default GetServiceDetail;
