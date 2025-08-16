const purchaseModel = require('../models/purchaseModel');

// Create a new purchase
const createPurchase = (req, res) => {
  const data = req.body;

  if (!data.product_id || !data.supplier_id || !data.user_id || !data.quantity || !data.unit_price) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  purchaseModel.createPurchase(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create purchase', details: err });
    res.status(201).json({ message: 'Purchase created successfully', purchaseId: result.insertId });
  });
};

// Get all purchases
const getAllPurchases = (req, res) => {
  purchaseModel.getAllPurchases((err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch purchases', details: err });
    res.status(200).json(result);
  });
};

// Get a purchase by ID
const getPurchaseById = (req, res) => {
  const id = req.params.id;

  purchaseModel.getPurchaseById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch purchase', details: err });
    if (result.length === 0) return res.status(404).json({ error: 'Purchase not found' });
    res.status(200).json(result[0]);
  });
};

// Update a purchase
const updatePurchase = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  purchaseModel.updatePurchase(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update purchase', details: err });
    res.status(200).json({ message: 'Purchase updated successfully' });
  });
};

// Delete a purchase
const deletePurchase = (req, res) => {
  const id = req.params.id;

  purchaseModel.deletePurchase(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete purchase', details: err });
    res.status(200).json({ message: 'Purchase deleted successfully' });
  });
};

// Search purchase by invoice (searching by purchase_id here)
const searchPurchaseByInvoice = (req, res) => {
  const invoice = req.query.invoice;

  if (!invoice) return res.status(400).json({ error: 'Invoice number is required' });

  purchaseModel.searchPurchaseByInvoice(invoice, (err, result) => {
    if (err) return res.status(500).json({ error: 'Search failed', details: err });
    res.status(200).json(result);
  });
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  searchPurchaseByInvoice
};
