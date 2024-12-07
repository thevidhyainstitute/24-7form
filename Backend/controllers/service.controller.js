// controllers/service.controller.js
const Service = require('../models/service.model');

exports.createService = async (req, res) => {
  try {
    const {  branchName, serviceDate, customerName, address, serviceTimeFrom, serviceTimeTo, customerFeedback, technicianName, technicianSignature, customerSignature, customerPhoto } = req.body;

    const userId = req.user.userId;
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
      userId
    });

    res.status(201).json({ message: 'Service record created successfully', data: newService });
  } catch (error) {
    console.log(error, 'error')
    res.status(500).json({data: {}, message: 'Internal Server error' });
  }
};
