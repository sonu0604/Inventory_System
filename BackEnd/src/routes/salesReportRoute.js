const express = require("express");
const router = express.Router();
const salesReportController = require("../controllers/salesReportController");

// GET /api/reports/sales?fromDate=2025-08-01&toDate=2025-08-22
router.get("/", salesReportController.getSalesReport);

module.exports = router;
