const express = require("express");
const router = express.Router();
const purchaseReportController = require("../controllers/purchaseReportController");

// GET /api/reports/purchases?fromDate=2025-08-01&toDate=2025-08-22
router.get("/", purchaseReportController.getPurchaseReport);

module.exports = router;
