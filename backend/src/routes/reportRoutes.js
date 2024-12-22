// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const reportController = require('../controllers/reportController');
const Permission = require('../models/Permission')

router.use(protect);

router.get('/',authorize(Permission.VIEW_REPORTS), reportController.generateMonthlyReport);


module.exports = router;