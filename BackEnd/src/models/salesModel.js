// models/salesModel.js
const db = require("../../db");

// Create Sale
// const createSale = (data, callback) => {
//     const sql = `
//         INSERT INTO sales (product_id, consumer_id, user_id, quantity, unit_price)
//         VALUES (?, ?, ?, ?, ?)
//     `;
//     const values = [
//         data.product_id,
//         data.consumer_id,
//         data.user_id,
//         data.quantity,
//         data.unit_price
//     ];
//     db.query(sql, values, callback);
// };

// ========== Helpers / Lookups ==========
const getProductsForSale = (callback) => {
  const sql = `
    SELECT 
      product_id, 
      name, 
      quantity_in_stock, 
      minQty,
      unit_price
    FROM products
    ORDER BY name ASC
  `;
  db.query(sql, callback);
};

const getConsumers = (callback) => {
  const sql = `
    SELECT consumer_id, name 
    FROM consumers
    ORDER BY name ASC
  `;
  db.query(sql, callback);
};

const getProductByName = (name, callback) => {
  const sql = `
    SELECT product_id, quantity_in_stock, minQty, unit_price
    FROM products
    WHERE name = ?
    LIMIT 1
  `;
  db.query(sql, [name], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows[0] || null);
  });
};

const getConsumerByName = (name, callback) => {
  const sql = `
    SELECT consumer_id
    FROM consumers
    WHERE name = ?
    LIMIT 1
  `;
  db.query(sql, [name], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows[0] || null);
  });
};

// Generate invoice like: INV-2025-0001 (count resets each year)
const generateInvoiceNo = (callback) => {
  const sql = `SELECT invoice_no FROM sales ORDER BY sale_id DESC LIMIT 1`;
  db.query(sql, (err, result) => {
    if (err) return callback(err);

    let newInvoiceNo;
    if (result.length === 0) {
      // First invoice
      newInvoiceNo = "INV-2025-0001";
    } else {
      // Extract last number and increment
      const lastInvoice = result[0].invoice_no; // e.g. INV-2025-0002
      const lastNumber = parseInt(lastInvoice.split("-")[2], 10); // 0002 → 2
      const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
      newInvoiceNo = `INV-2025-${nextNumber}`;
    }

    callback(null, newInvoiceNo);
  });
};

// ========== Write operations ==========
const createSale = (data, callback) => {
  const sql = `
    INSERT INTO sales (invoice_no, product_id, consumer_id, user_id, quantity, unit_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.invoice_no,
    data.product_id,
    data.consumer_id,
    data.user_id,
    data.quantity,
    data.unit_price,
  ];
  db.query(sql, values, callback);
};

const decrementProductStock = (product_id, qty, callback) => {
  const sql = `
    UPDATE products
    SET quantity_in_stock = quantity_in_stock - ?
    WHERE product_id = ?
  `;
  db.query(sql, [qty, product_id], callback);
};

// Get all sales
// const getAllSales = (callback) => {
//     db.query("SELECT * FROM sales", callback);
// };

// // Get sale by ID
// const getSaleById = (id, callback) => {
//     db.query("SELECT * FROM sales WHERE sale_id = ?", [id], callback);
// };

// // Update sale
// const updateSale = (id, data, callback) => {
//     const sql = `
//         UPDATE sales
//         SET product_id = ?, consumer_id = ?, user_id = ?, quantity = ?, unit_price = ?
//         WHERE sale_id = ?
//     `;
//     const values = [
//         data.product_id,
//         data.consumer_id,
//         data.user_id,
//         data.quantity,
//         data.unit_price,
//         id
//     ];
//     db.query(sql, values, callback);
// };

// Delete sale
// const deleteSale = (id, callback) => {
//     db.query("DELETE FROM sales WHERE sale_id = ?", [id], callback);
// };

// // Search by invoiceNo → here we adapt to search by sale_id
// const searchSaleByInvoice = (invoice, callback) => {
//     db.query("SELECT * FROM sales WHERE sale_id = ?", [invoice], callback);
// };

// --- Get all sales with joins ---
const getAllSales = (callback) => {
  const sql = `
    SELECT s.sale_id, s.invoice_no, p.name AS product_name, c.name AS consumer_name, u.username AS username,
           s.quantity, s.unit_price, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN consumers c ON s.consumer_id = c.consumer_id
    JOIN users u ON s.user_id = u.user_id
    ORDER BY s.sale_id DESC
  `;
  db.query(sql, callback);
};

// --- Search sales ---
const searchSales = (q, callback) => {
  const sql = `
    SELECT s.sale_id, s.invoice_no, p.name AS product_name, c.name AS consumer_name, u.username AS username,
           s.quantity, s.unit_price, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN consumers c ON s.consumer_id = c.consumer_id
    JOIN users u ON s.user_id = u.user_id
    WHERE s.invoice_no LIKE ? OR p.name LIKE ? OR c.name LIKE ? OR u.username LIKE ?
  `;
  const likeQ = `%${q}%`;
  db.query(sql, [likeQ, likeQ, likeQ, likeQ], callback);
};

// --- Update sale + adjust stock ---
const updateSale = (id, data, callback) => {
  const getOldSql = "SELECT product_id, quantity FROM sales WHERE sale_id = ?";
  db.query(getOldSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, { affectedRows: 0 });

    const oldSale = results[0];
    const oldQty = oldSale.quantity;
    const productId = oldSale.product_id;

    const updateSql = "UPDATE sales SET quantity = ?, unit_price = ? WHERE sale_id = ?";
    db.query(updateSql, [data.quantity, data.unit_price, id], (err2, updateResult) => {
      if (err2) return callback(err2);

      const diff = oldQty - data.quantity; // decrease stock if sale increased
      const stockSql = "UPDATE products SET quantity_in_stock = quantity_in_stock + ? WHERE product_id = ?";
      db.query(stockSql, [diff, productId], (err3) => {
        if (err3) console.error("Stock update failed:", err3);
        callback(null, updateResult);
      });
    });
  });
};

// --- Delete sale + restore stock ---
const deleteSale = (id, callback) => {
  const getSql = "SELECT product_id, quantity FROM sales WHERE sale_id = ?";
  db.query(getSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, { affectedRows: 0 });

    const { product_id, quantity } = results[0];
    const deleteSql = "DELETE FROM sales WHERE sale_id = ?";
    db.query(deleteSql, [id], (err2, deleteResult) => {
      if (err2) return callback(err2);

      const stockSql = "UPDATE products SET quantity_in_stock = quantity_in_stock + ? WHERE product_id = ?";
      db.query(stockSql, [quantity, product_id], (err3) => {
        if (err3) console.error("Stock update failed:", err3);
        callback(null, deleteResult);
      });
    });
  });
};

// --- Get sale by ID ---
const getSaleById = (id, callback) => {
  const sql = `
    SELECT s.sale_id, s.invoice_no, p.name AS product_name, c.name AS consumer_name, u.username,
           s.quantity, s.unit_price, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN consumers c ON s.consumer_id = c.consumer_id
    JOIN users u ON s.user_id = u.user_id
    WHERE s.sale_id = ?
  `;
  db.query(sql, [id], callback);
};

// --- List products with available stock (stock - minQty) ---
const listProductsWithAvailability = (callback) => {
  const sql = "SELECT product_id, name, quantity_in_stock, minQty, unit_price FROM products";
  db.query(sql, callback);
};

// --- List consumers ---
const listConsumers = (callback) => {
  const sql = "SELECT consumer_id, name FROM consumers";
  db.query(sql, callback);
};
module.exports = {
    // createSale,
    // getAllSales,
    // getSaleById,
    // updateSale,
    // deleteSale,
    // searchSaleByInvoice,
     getProductsForSale,
    getConsumers,
    getProductByName,
    getConsumerByName,
    generateInvoiceNo,
    createSale,
    decrementProductStock,
    getAllSales,
    searchSales,
    updateSale,
    deleteSale,
    getSaleById,
    listProductsWithAvailability,
    listConsumers
};
