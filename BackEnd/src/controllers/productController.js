const productModel = require('../models/productModel');
const db=require("../../db")

// CREATE PRODUCT
const createProduct = (req, res) => {
  const { name, category_id, unit_price, quantity_in_stock, minQty } = req.body;
  const created_by = req.user?.id || 1; // fallback for now

  if (!name || !category_id || !unit_price || !minQty) {
    return res.status(400).json({ message: "⚠️ Required fields missing" });
  }

  const newProduct = {
    name: name.trim(),
    category_id,
    unit_price,
    quantity_in_stock: quantity_in_stock || 0,
    minQty,
    created_by,
  };

  if (req.file) {
    // ✅ only filename (NOT /uploads/filename)
    newProduct.product_image = req.file.filename;
  }

  const sql = "INSERT INTO products SET ?";
  db.query(sql, newProduct, (err, result) => {
    if (err) {
      console.error("❌ Error creating product:", err);
      return res.status(500).json({ message: "❌ Failed to create product" });
    }
    res.status(201).json({ message: "✅ Product created successfully" });
  });
};

const getAllProducts = (req, res) => {
  productModel.getAllProducts((err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching products', error: err });
    res.json(results);
  });
};

const getProductById = (req, res) => {
  productModel.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching product', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result[0]);
  });
};


// UPDATE PRODUCT
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, category_id, unit_price, quantity_in_stock, minQty } = req.body;

  if (!name || !category_id || !unit_price || !minQty) {
    return res.status(400).json({ message: "⚠️ Required fields missing" });
  }

  const updatedData = {
    name: name.trim(),
    category_id,
    unit_price,
    quantity_in_stock,
    minQty,
  };

  if (req.file) {
    updatedData.product_image = req.file.filename;
  }

  const sql = "UPDATE products SET ? WHERE product_id = ?";
  db.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating product:", err);
      return res.status(500).json({ message: "❌ Failed to update product" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "⚠️ Product not found" });
    }
    res.json({ message: "✅ Product updated successfully" });
  });
};



const deleteProduct = (req, res) => {
  productModel.deleteProduct(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });
    res.json({ message: 'Product deleted successfully' });
  });
};

const searchProductByName = (req, res) => {
  productModel.searchProductByName(req.params.name, (err, result) => {
    if (err) return res.status(500).json({ message: 'Search failed', error: err });
    res.json(result);
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductByName
};
