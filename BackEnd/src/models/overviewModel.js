const db = require("../../db.js");

// ✅ Total Products
const getTotalProducts = (callback) => {
  const sql = "SELECT COUNT(*) AS total_products FROM products";
  db.query(sql, callback);
};

// ✅ Low Stock Products
const getLowStockProducts = (callback) => {
  const sql = "SELECT COUNT(*) AS low_stock FROM products WHERE quantity_in_stock <= minQty+5";
  db.query(sql, callback);
};

// ✅ Total Sales Revenue
const getTotalSalesRevenue = (callback) => {
  const sql = "SELECT IFNULL(SUM(quantity * unit_price),0) AS total_revenue FROM sales";
  db.query(sql, callback);
};

// ✅ Total Purchases
const getTotalPurchases = (callback) => {
  const sql = "SELECT IFNULL(SUM(quantity * unit_price),0) AS total_purchases FROM purchases";
  db.query(sql, callback);
};

// ✅ Recent Sales
const getRecentSales = (callback) => {
  const sql = `
    SELECT s.sale_id, p.name as product_name, c.name as consumer_name, s.quantity, s.unit_price, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN consumers c ON s.consumer_id = c.consumer_id
    ORDER BY s.sale_date DESC
    LIMIT 5
  `;
  db.query(sql, callback);
};

// ✅ Recent Purchases
const getRecentPurchases = (callback) => {
  const sql = `
    SELECT pur.purchase_id, p.name as product_name, sup.name as supplier_name, pur.quantity, pur.unit_price, pur.purchase_date
    FROM purchases pur
    JOIN products p ON pur.product_id = p.product_id
    JOIN suppliers sup ON pur.supplier_id = sup.supplier_id
    ORDER BY pur.purchase_date DESC
    LIMIT 5
  `;
  db.query(sql, callback);
};

module.exports = {
  getTotalProducts,
  getLowStockProducts,
  getTotalSalesRevenue,
  getTotalPurchases,
  getRecentSales,
  getRecentPurchases,
};
