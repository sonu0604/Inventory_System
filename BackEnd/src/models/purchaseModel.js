const db = require("../../db.js");
const getLastInvoiceNo = (callback) => {
  const sql = "SELECT invoice_no FROM purchases ORDER BY purchase_id DESC LIMIT 1";
  db.query(sql, callback);
};
// ✅ Create Purchase
const createPurchase = (data, callback) => {
  const sql = `
    INSERT INTO purchases (invoice_no, product_id, supplier_id, user_id, quantity, unit_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.invoice_no,
    data.product_id,
    data.supplier_id,
    data.user_id,
    data.quantity,
    data.unit_price,
  ];
  db.query(sql, values, callback);
};

// ✅ Get All Purchases with joins

// 📋 Get All Purchases
// 📋 Get All Purchases with product, supplier, and user info
const getAllPurchases = (callback) => {
  const sql = `
    SELECT p.purchase_id, p.invoice_no, pr.name as product_name, s.name as supplier_name, u.username as user_name,
           p.quantity, p.unit_price,  p.purchase_date
    FROM purchases p
    JOIN products pr ON p.product_id = pr.product_id
    JOIN suppliers s ON p.supplier_id = s.supplier_id
    JOIN users u ON p.user_id = u.user_id
    ORDER BY p.purchase_id DESC
  `;
  db.query(sql, callback);
};

// 🔍 Search Purchases
const searchPurchases = (q, callback) => {
  const sql = `
    SELECT p.purchase_id, p.invoice_no, pr.name, s.name, u.username,
           p.quantity, p.unit_price, p.purchase_date
    FROM purchases p
    JOIN products pr ON p.product_id = pr.product_id
    JOIN suppliers s ON p.supplier_id = s.supplier_id
    JOIN users u ON p.user_id = u.user_id
    WHERE p.invoice_no LIKE ? OR pr.name LIKE ? OR s.name LIKE ? OR u.username LIKE ?
  `;
  const likeQ = `%${q}%`;
  db.query(sql, [likeQ, likeQ, likeQ, likeQ], callback);
};

// ✏️ Update Purchase + Adjust Product Stock
const updatePurchase = (id, data, callback) => {
  // Step 1: Get old purchase quantity
  const getOldSql =
    "SELECT product_id, quantity FROM purchases WHERE purchase_id = ?";
  db.query(getOldSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, { affectedRows: 0 });

    const oldPurchase = results[0];
    const oldQty = oldPurchase.quantity;
    const productId = oldPurchase.product_id;

    // Step 2: Update purchase
    const updateSql =
      "UPDATE purchases SET quantity = ?, unit_price = ? WHERE purchase_id = ?";
    db.query(updateSql, [data.quantity, data.unit_price, id], (err2, updateResult) => {
      if (err2) return callback(err2);

      // Step 3: Adjust stock (newQty - oldQty)
      const diff = data.quantity - oldQty;
      const stockSql =
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?";
      db.query(stockSql, [diff, productId], (err3) => {
        if (err3) {
          console.error("Stock update failed:", err3);
          // Don’t break the whole flow if stock update fails
        }

        // ✅ Always return the update result so controller has affectedRows
        callback(null, updateResult);
      });
    });
  });
};

// ❌ Delete Purchase + Adjust Stock
const deletePurchase = (id, callback) => {
  // Step 1: Get purchase details
  const getSql = "SELECT product_id, quantity FROM purchases WHERE purchase_id = ?";
  db.query(getSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, { affectedRows: 0 });

    const { product_id, quantity } = results[0];

    // Step 2: Delete purchase
    const deleteSql = "DELETE FROM purchases WHERE purchase_id = ?";
    db.query(deleteSql, [id], (err2, deleteResult) => {
      if (err2) return callback(err2);

      // Step 3: Reduce stock
      const stockSql =
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?";
      db.query(stockSql, [quantity, product_id], (err3) => {
        if (err3) {
          console.error("Stock update failed:", err3);
          // ⚠️ Don’t throw 500, just log + continue
        }

        // ✅ Always return delete result so controller can respond
        callback(null, deleteResult);
      });
    });
  });
};

module.exports = {
  createPurchase,
  getAllPurchases,
  updatePurchase,
  deletePurchase,
  getLastInvoiceNo,
  searchPurchases
};
