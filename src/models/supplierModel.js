const db = require('../../db.js');

const Supplier = {
  create: (data, callback) => {
    const { name, contact_info, address, created_by } = data;
    const query = `INSERT INTO suppliers (name, contact_info, address, created_by) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, contact_info, address, created_by], callback);
  },

  findAll: (callback) => {
    db.query(`SELECT * FROM suppliers`, callback);
  },

  findById: (id, callback) => {
    db.query(`SELECT * FROM suppliers WHERE supplier_id = ?`, [id], callback);
  },

  update: (id, data, callback) => {
    const { name, contact_info, address } = data;
    db.query(
      `UPDATE suppliers SET name = ?, contact_info = ?, address = ? WHERE supplier_id = ?`,
      [name, contact_info, address, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(`DELETE FROM suppliers WHERE supplier_id = ?`, [id], callback);
  },

  searchByName: (name, callback) => {
    db.query(`SELECT * FROM suppliers WHERE name LIKE ?`, [`%${name}%`], callback);
  }
};

module.exports = Supplier;
