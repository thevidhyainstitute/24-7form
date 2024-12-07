// routes/service.routes.js
const express = require('express');
const router = express.Router();
const { createService } = require('../controllers/service.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const { getAllServiceRecords ,getServiceDetails,downloadServiceReport,getServiceDetailsPDF,getAllTechnicians,getTechnicianDetails} = require('../controllers/auth.controller');


// Technician Routes 
router.post('/create-service', authMiddleware, createService);
router.get('/get-service/:id', authMiddleware, getServiceDetails);
router.get('/report-pdf/:id', authMiddleware, getServiceDetailsPDF);


// Admin Routes
router.get('/report-download', authMiddleware,adminMiddleware, downloadServiceReport); // Admin only
router.get('/get-all-technicians', authMiddleware, adminMiddleware, getAllTechnicians); // Admin only
router.get('/get-technician/:id', authMiddleware,adminMiddleware, getTechnicianDetails); // Admin only
router.get('/get-all-service', authMiddleware, adminMiddleware, getAllServiceRecords); // Admin only

module.exports = router;
