// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, changePassword, createTechnician } = require('../controllers/auth.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

router.post('/login', login);
router.post('/change-password', authMiddleware, changePassword); // Authenticated
router.post('/create-technician', authMiddleware, adminMiddleware, createTechnician); // Admin only

module.exports = router;