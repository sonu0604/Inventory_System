const db = require("../../db.js");

// ✅ Total purchase summary
const getPurchaseSummary = (filters, callback) => {
  let sql = `
    SELECT 
      COUNT(*) AS total_purchases,
      IFNULL(SUM(pur.quantity), 0) AS total_quantity,
      IFNULL(SUM(pur.quantity * pur.unit_price), 0) AS total_spent
    FROM purchases pur
    JOIN products p ON pur.product_id = p.product_id
    JOIN suppliers s ON pur.supplier_id = s.supplier_id
    JOIN categories cat ON p.category_id = cat.category_id
    WHERE 1=1
  `;
  
  const params = [];

  if (filters.fromDate) {
    sql += " AND pur.purchase_date >= ?";
    params.push(filters.fromDate + " 00:00:00");
  }
  if (filters.toDate) {
    sql += " AND pur.purchase_date <= ?";
    params.push(filters.toDate + " 23:59:59");
  }
  if (filters.product_id) {
    sql += " AND pur.product_id = ?";
    params.push(filters.product_id);
  }
  if (filters.supplier_id) {
    sql += " AND pur.supplier_id = ?";
    params.push(filters.supplier_id);
  }
  if (filters.category_id) {
    sql += " AND p.category_id = ?";
    params.push(filters.category_id);
  }

  db.query(sql, params, callback);
};

// ✅ Detailed purchase report (for tables / charts)
const getPurchaseDetails = (filters, callback) => {
  let sql = `
    SELECT pur.purchase_id, pur.invoice_no, pur.quantity, pur.unit_price, pur.purchase_date,
           p.name AS product_name, s.name AS supplier_name, cat.name AS category_name
    FROM purchases pur
    JOIN products p ON pur.product_id = p.product_id
    JOIN suppliers s ON pur.supplier_id = s.supplier_id
    JOIN categories cat ON p.category_id = cat.category_id
    WHERE 1=1
  `;
  
  const params = [];

  if (filters.fromDate) {
    sql += " AND pur.purchase_date >= ?";
    params.push(filters.fromDate + " 00:00:00");
  }
  if (filters.toDate) {
    sql += " AND pur.purchase_date <= ?";
    params.push(filters.toDate + " 23:59:59");
  }
  if (filters.product_id) {
    sql += " AND pur.product_id = ?";
    params.push(filters.product_id);
  }
  if (filters.supplier_id) {
    sql += " AND pur.supplier_id = ?";
    params.push(filters.supplier_id);
  }
  if (filters.category_id) {
    sql += " AND p.category_id = ?";
    params.push(filters.category_id);
  }

  sql += " ORDER BY pur.purchase_date DESC";

  db.query(sql, params, callback);
};

module.exports = { getPurchaseSummary, getPurchaseDetails };
