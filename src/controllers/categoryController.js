const categoryModel = require('../models/categoryModel.js');

const createCategory = (req, res) => {
  const { name } = req.body;

  // Validate required field
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Category name is required' });
  }

  // Check for duplicates
  categoryModel.findCategoryByName(name.trim(), (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (result.length > 0) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    // Create category
    categoryModel.createCategory(name.trim(), (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to create category', error: err });
      return res.status(201).json({ message: 'Category created successfully' });
    });
  });
};
const getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching categories', error: err });
    res.json(results);
  });
};

const getCategoryById = (req, res) => {
  const { id } = req.params;
  categoryModel.getCategoryById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching category', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(result[0]);
  });
};

const getCategoryByName = (req, res) => {
  const { name } = req.params;
  categoryModel.getCategoryByName(name, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching category by name', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(result[0]);
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Category name is required' });
  }

  categoryModel.updateCategory(id, name.trim(), (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Category name already exists' });
      }
      return res.status(500).json({ message: 'Error updating category', error: err });
    }
    res.json({ message: 'Category updated successfully' });
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  categoryModel.deleteCategory(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting category', error: err });
    res.json({ message: 'Category deleted successfully' });
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory,
  createCategory 
};


