const db = require('../../db.js');

const createCategory = (name, callback) => {
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  db.query(sql, [name], callback);
};

const findCategoryByName = (name, callback) => {
  const sql = 'SELECT * FROM categories WHERE name = ?';
  db.query(sql, [name], callback);
};
const getAllCategories = (callback) => {
  db.query('SELECT * FROM categories', callback);
};

const getCategoryById = (id, callback) => {
  db.query('SELECT * FROM categories WHERE category_id = ?', [id], callback);
};

const getCategoryByName = (name, callback) => {
  db.query('SELECT * FROM categories WHERE name = ?', [name], callback);
};

const updateCategory = (id, name, callback) => {
  db.query('UPDATE categories SET name = ? WHERE category_id = ?', [name, id], callback);
};

const deleteCategory = (id, callback) => {
  db.query('DELETE FROM categories WHERE category_id = ?', [id], callback);
};

module.exports = {
  createCategory,
  findCategoryByName,
    getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory
};
