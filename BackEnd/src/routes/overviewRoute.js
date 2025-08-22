const express = require("express");
const router = express.Router();
const { getDashboardOverview } = require("../controllers/overviewController");

// Example: GET http://localhost:3000/api/dashboard/overview
router.get("/overview", getDashboardOverview);

module.exports = router;