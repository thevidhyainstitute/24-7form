// controllers/service.controller.js
const Service = require("../models/service.model");

// exports.createService = async (req, res) => {
//   try {
//     const {  branchName, serviceDate, customerName, address, serviceTimeFrom, serviceTimeTo, customerFeedback, technicianName, technicianSignature, customerSignature, customerPhoto } = req.body;

//     const userId = req.user.userId;
//     const newService = await Service.create({
//       branchName,
//       serviceDate,
//       customerName,
//       address,
//       serviceTimeFrom,
//       serviceTimeTo,
//       customerFeedback,
//       technicianName,
//       technicianSignature,
//       customerSignature,
//       customerPhoto,
//       userId
//     });

//     res.status(201).json({ message: 'Service record created successfully', data: newService });
//   } catch (error) {
//     console.log(error, 'error')
//     res.status(500).json({data: {}, message: 'Internal Server error' });
//   }
// };

exports.createService = async (req, res) => {
  try {
    const {
      branchName,
      serviceDate,
      customerName,
      address,
      serviceTimeFrom,
      serviceTimeTo,
      customerFeedback,
      technicianName,
      technicianSignature,
      customerSignature,
      customerPhoto,
      observationBySms,
      pestTrapCatches,
      servicesCarriedOut, // Expecting this as an object from the frontend
    } = req.body;

    const userId = req.user.userId;

    console.log(req.body, "req.body");
    // Create a new service record in the database
    const newService = await Service.create({
      branchName,
      serviceDate,
      customerName,
      address,
      serviceTimeFrom,
      serviceTimeTo,
      customerFeedback,
      technicianName,
      technicianSignature,
      customerSignature,
      customerPhoto,
      observationBySms,
      pestTrapCatches,
      servicesCarriedOut: JSON.stringify(servicesCarriedOut), // Store as JSON
      userId,
    });

    res.status(201).json({
      message: "Service record created successfully",
      data: newService,
    });
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({
      data: {},
      message: "Internal Server error",
    });
  }
};
