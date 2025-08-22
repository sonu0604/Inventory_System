const purchaseReportModel = require("../models/purchaseReportModel");

// GET /api/reports/purchases
const getPurchaseReport = (req, res) => {
  const filters = {
    fromDate: req.query.fromDate || null,
    toDate: req.query.toDate || null,
    product_id: req.query.product_id || null,
    supplier_id: req.query.supplier_id || null,
    category_id: req.query.category_id || null,
  };

  let responseData = {};

  // 1️⃣ Get summary KPIs
  purchaseReportModel.getPurchaseSummary(filters, (err, summaryResult) => {
    if (err) return res.status(500).json({ message: "Error fetching purchase summary", error: err });

    responseData.summary = summaryResult[0];

    // 2️⃣ Get detailed purchases
    purchaseReportModel.getPurchaseDetails(filters, (err, detailsResult) => {
      if (err) return res.status(500).json({ message: "Error fetching purchase details", error: err });

      responseData.purchases = detailsResult;

      res.json(responseData);
    });
  });
};

module.exports = { getPurchaseReport };
