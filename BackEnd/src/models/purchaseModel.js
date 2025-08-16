const db = require('../../db.js');

const createPurchase = (data, callback) => {
  const sql = `
    INSERT INTO purchases 
    (product_id, supplier_id, user_id, quantity, unit_price)
    VALUES (?, ?, ?, ?, ?)`;
  const values = [
    data.product_id, data.supplier_id, data.user_id,
    data.quantity, data.unit_price
  ];
  db.query(sql, values, callback);
};

const getAllPurchases = (callback) => {
  db.query('SELECT * FROM purchases', callback);
};

const getPurchaseById = (id, callback) => {
  db.query('SELECT * FROM purchases WHERE purchase_id = ?', [id], callback);
};

const updatePurchase = (id, data, callback) => {
  const sql = `
    UPDATE purchases 
    SET product_id = ?, supplier_id = ?, user_id = ?, quantity = ?, unit_price = ?
    WHERE purchase_id = ?`;
  const values = [
    data.product_id, data.supplier_id, data.user_id,
    data.quantity, data.unit_price, id
  ];
  db.query(sql, values, callback);
};

const deletePurchase = (id, callback) => {
  db.query('DELETE FROM purchases WHERE purchase_id = ?', [id], callback);
};

const searchPurchaseByInvoice = (invoiceNo, callback) => {
  db.query('SELECT * FROM purchases WHERE purchase_id LIKE ?', [`%${invoiceNo}%`], callback);
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  searchPurchaseByInvoice
};
