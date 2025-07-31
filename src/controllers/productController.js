const productModel = require('../models/productModel');

const createProduct = (req, res) => {
  const { name, category_id, unit_price, quantity_in_stock, created_by, product_image, minQty } = req.body;

  if (!name || !category_id || !unit_price || !created_by || !minQty) {
    return res.status(400).json({ message: 'All fields are required (except image and stock)' });
  }

  productModel.findProductByName(name.trim(), (err, result) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    if (result.length > 0) return res.status(409).json({ message: 'Product with same name already exists' });

    const data = {
      name: name.trim(),
      category_id,
      unit_price,
      quantity_in_stock: quantity_in_stock || 0,
      created_by,
      product_image: product_image || null,
      minQty
    };

    productModel.createProduct(data, (err, result) => {
      if (err) return res.status(500).json({ message: 'Insert failed', error: err });
      res.status(201).json({ message: 'Product created successfully' });
    });
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

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, category_id, unit_price, quantity_in_stock, created_by, product_image, minQty } = req.body;

  if (!name || !category_id || !unit_price || !created_by || !minQty) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  productModel.findProductByName(name.trim(), (err, result) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    if (result.length > 0 && result[0].product_id != id) {
      return res.status(409).json({ message: 'Product name already exists' });
    }

    const updatedData = {
      name: name.trim(),
      category_id,
      unit_price,
      quantity_in_stock: quantity_in_stock || 0,
      created_by,
      product_image: product_image || null,
      minQty
    };

    productModel.updateProduct(id, updatedData, (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });
      res.json({ message: 'Product updated successfully' });
    });
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
