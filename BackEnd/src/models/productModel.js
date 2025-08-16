const db = require('../../db.js');

const createProduct = (data, callback) => {
  const sql = `
    INSERT INTO products 
    (name, category_id, unit_price, quantity_in_stock, created_by, product_image, minQty)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.name, data.category_id, data.unit_price, data.quantity_in_stock,
    data.created_by, data.product_image, data.minQty
  ];
  db.query(sql, values, callback);
};

const findProductByName = (name, callback) => {
  db.query('SELECT * FROM products WHERE name = ?', [name], callback);
};

const getAllProducts = (callback) => {
  db.query('SELECT * FROM products', callback);
};

const getProductById = (id, callback) => {
  db.query('SELECT * FROM products WHERE product_id = ?', [id], callback);
};

const updateProduct = (id, data, callback) => {
  const sql = `
    UPDATE products SET name = ?, category_id = ?, unit_price = ?, quantity_in_stock = ?,
    created_by = ?, product_image = ?, minQty = ?
    WHERE product_id = ?`;
  const values = [
    data.name, data.category_id, data.unit_price, data.quantity_in_stock,
    data.created_by, data.product_image, data.minQty, id
  ];
  db.query(sql, values, callback);
};

const deleteProduct = (id, callback) => {
  db.query('DELETE FROM products WHERE product_id = ?', [id], callback);
};

const searchProductByName = (name, callback) => {
  db.query('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`], callback);
};

module.exports = {
  createProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductByName
};
