const salesReportModel = require("../models/salesReportModel");

// GET /api/reports/sales
const getSalesReport = (req, res) => {
  const filters = {
    fromDate: req.query.fromDate || null,
    toDate: req.query.toDate || null,
    product_id: req.query.product_id || null,
    consumer_id: req.query.consumer_id || null,
    category_id: req.query.category_id || null,
  };

  let responseData = {};

  // 1️⃣ Get summary KPIs
  salesReportModel.getSalesSummary(filters, (err, summaryResult) => {
    if (err) return res.status(500).json({ message: "Error fetching sales summary", error: err });

    responseData.summary = summaryResult[0];

    // 2️⃣ Get detailed sales
    salesReportModel.getSalesDetails(filters, (err, detailsResult) => {
      if (err) return res.status(500).json({ message: "Error fetching sales details", error: err });

      responseData.sales = detailsResult;

      res.json(responseData);
    });
  });
};

module.exports = { getSalesReport };
