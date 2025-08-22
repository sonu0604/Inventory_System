const overviewModel = require("../models/overviewModel");

const getDashboardOverview = (req, res) => {
  let responseData = {};

  overviewModel.getTotalProducts((err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching total products", error: err });
    responseData.totalProducts = result[0].total_products;

    overviewModel.getLowStockProducts((err, result) => {
      if (err) return res.status(500).json({ message: "Error fetching low stock", error: err });
      responseData.lowStock = result[0].low_stock;

      overviewModel.getTotalSalesRevenue((err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching sales revenue", error: err });
        responseData.totalRevenue = result[0].total_revenue;

        overviewModel.getTotalPurchases((err, result) => {
          if (err) return res.status(500).json({ message: "Error fetching purchases", error: err });
          responseData.totalPurchases = result[0].total_purchases;

          overviewModel.getRecentSales((err, result) => {
            if (err) return res.status(500).json({ message: "Error fetching recent sales", error: err });
            responseData.recentSales = result;

            overviewModel.getRecentPurchases((err, result) => {
              if (err) return res.status(500).json({ message: "Error fetching recent purchases", error: err });
              responseData.recentPurchases = result;

              // ✅ Final response
              res.json(responseData);
            });
          });
        });
      });
    });
  });
};

module.exports = { getDashboardOverview };
