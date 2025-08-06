const db = require('../../db.js');

// Create a new supplier
const createSupplier = (data, callback) => {
  const sql = `
    INSERT INTO suppliers (name, contact_info, address, created_by)
    VALUES (?, ?, ?, ?)`;
  const values = [
    data.name, data.contact_info, data.address, data.created_by
  ];
  db.query(sql, values, callback);
};

// Get all suppliers
const getAllSuppliers = (callback) => {
  db.query('SELECT * FROM suppliers', callback);
};

// Get supplier by ID
const getSupplierById = (id, callback) => {
  db.query('SELECT * FROM suppliers WHERE supplier_id = ?', [id], callback);
};

// Update supplier by ID
const updateSupplier = (id, data, callback) => {
  const sql = `
    UPDATE suppliers SET name = ?, contact_info = ?, address = ?
    WHERE supplier_id = ?`;
  const values = [
    data.name, data.contact_info, data.address, id
  ];
  db.query(sql, values, callback);
};

// Delete supplier by ID
const deleteSupplier = (id, callback) => {
  db.query('DELETE FROM suppliers WHERE supplier_id = ?', [id], callback);
};

// Search suppliers by name
const searchSupplierByName = (name, callback) => {
  db.query('SELECT * FROM suppliers WHERE name LIKE ?', [`%${name}%`], callback);
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  searchSupplierByName
};
