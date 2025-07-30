<<<<<<< Updated upstream
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
=======
const db = require("../../db");

const createCategory = (name, callback) => {
  const sql = "INSERT INTO categories (name) VALUES (?)";
  db.query(sql, [name], callback);
};

const getAllCategories = (callback) => {
  db.query("SELECT * FROM categories", callback);
};

const getCategoryById = (id, callback) => {
  db.query("SELECT * FROM categories WHERE category_id = ?", [id], callback);
};

const updateCategory = (id, name, callback) => {
  db.query("UPDATE categories SET name = ? WHERE category_id = ?", [name, id], callback);
};

const deleteCategory = (id, callback) => {
  db.query("DELETE FROM categories WHERE category_id = ?", [id], callback);
};

const searchCategoryByName = (name, callback) => {
  db.query("SELECT * FROM categories WHERE name LIKE ?", [`%${name}%`], callback);
};

const isCategoryExists = (name, callback) => {
  db.query("SELECT * FROM categories WHERE name = ?", [name], callback);
>>>>>>> Stashed changes
};

module.exports = {
  createCategory,
<<<<<<< Updated upstream
  findCategoryByName,
    getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory
=======
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategoryByName,
  isCategoryExists,
>>>>>>> Stashed changes
};
