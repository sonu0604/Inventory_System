const categoryModel = require("../models/categoryModel");

//  Add new category
exports.createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Category name is required" });

  categoryModel.isCategoryExists(name, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length > 0)
      return res.status(409).json({ message: "Category name already exists" });

    categoryModel.createCategory(name, (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to create category", error: err });

      res.status(201).json({ message: "Category created successfully", categoryId: result.insertId });
    });
  });
};

//  Fetch all categories
exports.getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch categories", error: err });
    res.status(200).json(results);
  });
};

//  Get category by ID
exports.getCategoryById = (req, res) => {
  const id = req.params.id;

  categoryModel.getCategoryById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch category", error: err });

    if (results.length === 0)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(results[0]);
  });
};

// Update category
exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Category name is required" });

  categoryModel.updateCategory(id, name, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to update category", error: err });

    res.status(200).json({ message: "Category updated successfully" });
  });
};

// Delete category
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  categoryModel.deleteCategory(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete category", error: err });

    res.status(200).json({ message: "Category deleted successfully" });
  });
};

//  Search category by name
exports.searchCategoryByName = (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).json({ message: "Search term is required" });

  categoryModel.searchCategoryByName(name, (err, results) => {
    if (err) return res.status(500).json({ message: "Search failed", error: err });

    res.status(200).json(results);
  });
};
