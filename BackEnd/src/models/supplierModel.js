const db = require("../../db");

// Create new supplier
const createSupplier = (data, callback) => {
  const sql = `
    INSERT INTO suppliers (name, contact_info, address, created_by)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [data.name, data.contact_info, data.address, data.created_by], callback);
};

// Get suppliers with pagination
const getSuppliersWithPagination = (limit, offset, callback) => {
  const sql = `SELECT * FROM suppliers ORDER BY supplier_id DESC LIMIT ? OFFSET ?`;
  db.query(sql, [parseInt(limit), parseInt(offset)], callback);
};
const getAllSuppliers = (callback) => {
  const sql = `SELECT * FROM suppliers ORDER BY supplier_id DESC`;
  db.query(sql, callback);
};
// Get total count (for pagination)
const getSuppliersCount = (callback) => {
  const sql = `SELECT COUNT(*) AS total FROM suppliers`;
  db.query(sql, callback);
};

// Find supplier by exact name (for duplicate check in create)
const findSupplierByName = (name, callback) => {
  const sql = `SELECT * FROM suppliers WHERE LOWER(name) = LOWER(?)`;
  db.query(sql, [name], callback);
};

// Search supplier by name with pagination
const searchSupplierByName = (name, limit, offset, callback) => {
  const sql = `
    SELECT * FROM suppliers 
    WHERE name LIKE ? 
    LIMIT ? OFFSET ?
  `;
  db.query(sql, [`%${name}%`, parseInt(limit), parseInt(offset)], callback);
};

// Get supplier by ID
const getSupplierById = (id, callback) => {
  const sql = `SELECT * FROM suppliers WHERE supplier_id = ?`;
  db.query(sql, [id], callback);
};

// Update supplier
const updateSupplier = (id, data, callback) => {
  const sql = `
    UPDATE suppliers 
    SET name = ?, contact_info = ?, address = ?
    WHERE supplier_id = ?
  `;
  db.query(sql, [data.name, data.contact_info, data.address, id], callback);
};

// Delete supplier
const deleteSupplier = (id, callback) => {
  const sql = `DELETE FROM suppliers WHERE supplier_id = ?`;
  db.query(sql, [id], callback);
};

module.exports = {
  createSupplier,
  getSuppliersWithPagination,
  getSuppliersCount,
  findSupplierByName,        // for duplicate check
  searchSupplierByName,      // for search endpoint
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getAllSuppliers
};

