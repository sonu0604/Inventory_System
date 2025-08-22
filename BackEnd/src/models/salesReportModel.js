const db = require("../../db.js");

// ✅ Total sales summary
const getSalesSummary = (filters, callback) => {
  let sql = `
    SELECT 
      COUNT(*) AS total_sales,
      IFNULL(SUM(s.quantity), 0) AS total_quantity,
      IFNULL(SUM(s.quantity * s.unit_price), 0) AS total_revenue
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN consumers c ON s.consumer_id = c.consumer_id
    JOIN categories cat ON p.category_id = cat.category_id
    WHERE 1=1
  `;
  
  const params = [];

  if (filters.fromDate) {
    sql += " AND s.sale_date >= ?";
    params.push(filters.fromDate + " 00:00:00");
  }
  if (filters.toDate) {
    sql += " AND s.sale_date <= ?";
    params.push(filters.toDate + " 23:59:59");
  }
  if (filters.product_id) {
    sql += " AND s.product_id = ?";
    params.push(filters.product_id);
  }
  if (filters.consumer_id) {
    sql += " AND s.consumer_id = ?";
    params.push(filters.consumer_id);
  }
  if (filters.category_id) {
    sql += " AND p.category_id = ?";
    params.push(filters.category_id);
  }

  db.query(sql, params, callback);
};

// ✅ Detailed sales report (for tables / charts)
const getSalesDetails = (filters, callback) => {
  let sql = `
    SELECT s.sale_id, s.invoice_no, s.quantity, s.unit_price, s.sale_date,
           p.name AS product_name, c.name AS consumer_name, cat.name AS category_name
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN consumers c ON s.consumer_id = c.consumer_id
    JOIN categories cat ON p.category_id = cat.category_id
    WHERE 1=1
  `;
  
  const params = [];

  if (filters.fromDate) {
    sql += " AND s.sale_date >= ?";
    params.push(filters.fromDate + " 00:00:00");
  }
  if (filters.toDate) {
    sql += " AND s.sale_date <= ?";
    params.push(filters.toDate + " 23:59:59");
  }
  if (filters.product_id) {
    sql += " AND s.product_id = ?";
    params.push(filters.product_id);
  }
  if (filters.consumer_id) {
    sql += " AND s.consumer_id = ?";
    params.push(filters.consumer_id);
  }
  if (filters.category_id) {
    sql += " AND p.category_id = ?";
    params.push(filters.category_id);
  }

  sql += " ORDER BY s.sale_date DESC";

  db.query(sql, params, callback);
};

module.exports = { getSalesSummary, getSalesDetails };
