const db = require('../../db.js');

// Create a new customer
const createCustomer = (data, callback) => {
  const sql = `
    INSERT INTO consumers (name, contact_info, address, created_by)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    data.name,
    data.contact_info || null,
    data.address || null,
    data.created_by || null
  ];
  db.query(sql, values, callback);
};

// Get all customers
const getAllCustomers = (callback) => {
  db.query('SELECT * FROM consumers', callback);
};

// Get customer by ID
const getCustomerById = (id, callback) => {
  db.query('SELECT * FROM consumers WHERE consumer_id = ?', [id], callback);
};

// Update customer
const updateCustomer = (id, data, callback) => {
  const sql = `
    UPDATE consumers
    SET name = ?, contact_info = ?, address = ?
    WHERE consumer_id = ?
  `;
  const values = [
    data.name,
    data.contact_info || null,
    data.address || null,
    id
  ];
  db.query(sql, values, callback);
};

// Delete customer
const deleteCustomer = (id, callback) => {
  db.query('DELETE FROM consumers WHERE consumer_id = ?', [id], callback);
};

// Search customer by name
const searchCustomerByName = (name, callback) => {
  db.query('SELECT * FROM consumers WHERE name LIKE ?', [`%${name}%`], callback);
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomerByName
};
