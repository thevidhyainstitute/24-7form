import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const CreateServicesForm = () => {
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
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [error, setError] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState({
    technician: false,
    customer: false,
  });
  const [showTerms, setShowTerms] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
    setShowTerms(e.target.checked);
  };

  const technicianSigRef = useRef();
  const customerSigRef = useRef();
  const webcamRef = useRef(null);

  const navigate = useNavigate();

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
          technicianName: response.data.user.name, // Auto-fill technician name with logged-in user's name
        }));
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching logged-in user details:", error);
        toast.error("Failed to fetch user details.");
      }
    };

    fetchLoggedInUserDetail();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const captureTechnicianSignature = () => {
    const signatureData = technicianSigRef.current.toDataURL();
    setFormData((prevState) => ({
      ...prevState,
      technicianSignature: signatureData,
    }));
    setSignatureSaved((prevState) => ({
      ...prevState,
      technician: true,
    }));

    toast.success("Technician Signature Saved!");
  };

  const captureCustomerSignature = () => {
    const signatureData = customerSigRef.current.toDataURL();
    setFormData((prevState) => ({
      ...prevState,
      customerSignature: signatureData,
    }));
    setSignatureSaved((prevState) => ({
      ...prevState,
      customer: true,
    }));

    toast.success("Customer Signature Saved!");
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData((prevState) => ({
      ...prevState,
      customerPhoto: imageSrc,
    }));
    setIsWebcamOpen(false);
    toast.success("Customer photo captured successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.jobcard.24x7pestcontrol.in/api/service/create-service",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Service created successfully:", response.data);
      toast.success("Service created successfully!");
      navigate(
        `/technician-dashboard/technician-service-detail/${response.data.data.serialNo}`
      );
      setFormData({
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
        customerPhoto: "",
      });
    } catch (error) {
      console.error("Error creating service:", error);
      setError("An error occurred while creating the service.");
      toast.error("An error occurred while creating the service.");
    }
  };

  // Show success notification when clicking on saved signature (Technician)
  const handleTechnicianSignatureClick = () => {
    if (signatureSaved.technician) {
      toast.success("Technician Signature Already Saved!");
    }
  };

  // Show success notification when clicking on saved signature (Customer)
  const handleCustomerSignatureClick = () => {
    if (signatureSaved.customer) {
      toast.success("Customer Signature Already Saved!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 border border-gray-300 shadow-md bg-white rounded-lg">
      {/* Form Section */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Branch Name:
            </label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Date:</label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Customer Name:
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Service Time From:
            </label>
            <input
              type="time"
              name="serviceTimeFrom"
              value={formData.serviceTimeFrom}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">To:</label>
            <input
              type="time"
              name="serviceTimeTo"
              value={formData.serviceTimeTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Services</h3>
          <label className="block text-gray-700 font-medium">
            Customer Feedback
          </label>
          <textarea
            name="customerFeedback"
            value={formData.customerFeedback}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technician Section */}
          <div className="border border-gray-300 rounded-lg p-4">
            <h4 className="text-lg font-bold text-gray-700 mb-4">Technician</h4>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name:</label>
              <input
                type="text"
                name="technicianName"
                value={formData.technicianName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-700 mb-4">
                Technician Signature
              </h4>
              <SignatureCanvas
                ref={technicianSigRef}
                backgroundColor="white"
                penColor="black"
                canvasProps={{ className: "border w-full h-40" }}
                onClick={handleTechnicianSignatureClick} // Trigger on click
              />
              <button
                type="button"
                onClick={captureTechnicianSignature}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Save Technician Signature
              </button>
            </div>
          </div>

          {/* Customer Rep Section */}
          <div className="border border-gray-300 rounded-lg p-4">
            <h4 className="text-lg font-bold text-gray-700 mb-4">Customer</h4>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name:</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-700 mb-4">
                Customer Signature
              </h4>
              <SignatureCanvas
                ref={customerSigRef}
                backgroundColor="white"
                penColor="black"
                canvasProps={{ className: "border w-full h-40" }}
                onClick={handleCustomerSignatureClick} // Trigger on click
              />
              <button
                type="button"
                onClick={captureCustomerSignature}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Save Customer Signature
              </button>
            </div>
          </div>
        </div>

        {/* Webcam Section */}
        <div>
          <h4 className="text-lg font-bold text-gray-700 mb-4">
            Customer Photo
          </h4>
          {isWebcamOpen ? (
            <div className="flex flex-col items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-60 border"
              />
              <button
                type="button"
                onClick={capturePhoto}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Capture Photo
              </button>
              <button
                type="button"
                onClick={() => setIsWebcamOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              {formData.customerPhoto && (
                <div className="mb-4">
                  <img
                    src={formData.customerPhoto}
                    alt="Captured"
                    className="w-32 h-32 border rounded"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsWebcamOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Open Webcam
              </button>
            </>
          )}
        </div>

        <div className="mt-4 flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="w-5 h-5 cursor-pointer"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms" className="ml-2 text-gray-700">
            I agree to the Terms and Conditions
          </label>
        </div>

        {/* Conditional Terms and Conditions Content */}
        {showTerms && (
          <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-gray-900 font-semibold text-lg mb-2">
              Terms and Conditions
            </h2>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-medium">1. Scope of Services</h3>
                <p>
                  1.1 The Service Provider agrees to provide pest control
                  services as described in the service agreement or quotation
                  provided to the Customer.
                </p>
                <p>
                  1.2 The services may include inspection, identification,
                  treatment, and prevention of pests such as cockroaches,
                  termites, ants, bedbugs, rodents, mosquitoes, etc.
                </p>
                <p>
                  1.3 The specific type of treatment will be determined based on
                  the pest infestation identified during the initial inspection.
                </p>
              </div>

              <div>
                <h3 className="font-medium">
                  2. Service Schedule and Appointments
                </h3>
                <p>
                  2.1 Services will be scheduled based on mutual agreement
                  between the Customer and the Service Provider.
                </p>
                <p>
                  2.2 The Customer is responsible for providing access to the
                  premises at the agreed-upon time for service. If access is not
                  provided, the Service Provider reserves the right to
                  reschedule the appointment and charge a fee for the missed
                  service.
                </p>
                <p>
                  2.3 The Customer must ensure that all necessary preparations,
                  as communicated by the Service Provider, are completed before
                  the service.
                </p>
              </div>

              <div>
                <h3 className="font-medium">3. Customer Obligations</h3>
                <p>
                  3.1 The Customer must disclose any known pest infestations and
                  provide accurate information about the property, including
                  areas of concern.
                </p>
                <p>
                  3.2 The Customer shall follow the instructions provided by the
                  Service Provider before, during, and after the treatment to
                  ensure effectiveness and safety.
                </p>
                <p>
                  3.3 The Customer is responsible for securing food, pets, and
                  personal belongings to prevent contamination or damage during
                  the pest control treatment.
                </p>
              </div>

              <div>
                <h3 className="font-medium">4. Safety and Liability</h3>
                <p>
                  4.1 The Service Provider uses approved chemicals and pest
                  control methods that are safe for humans and pets when used as
                  directed.
                </p>
                <p>
                  4.2 The Service Provider will not be liable for any damages or
                  injuries resulting from the Customer's failure to follow
                  instructions provided before, during, or after the treatment.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={
              !signatureSaved.technician ||
              !signatureSaved.customer ||
              !isCheckboxChecked
            }
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServicesForm;
