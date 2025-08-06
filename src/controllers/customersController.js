const customerModel = require('../models/customerModel');

// Create a new customer
const createCustomer = (req, res) => {
  const { name, contact_info, address } = req.body;
  const created_by = req.user?.user_id;

  if (!name || !created_by) {
    return res.status(400).json({ message: 'Name and created_by are required' });
  }

  const data = {
    name: name.trim(),
    contact_info: contact_info?.trim() || null,
    address: address?.trim() || null,
    created_by
  };

  customerModel.createCustomer(data, (err, result) => {
    if (err) return res.status(500).json({ message: 'Insert failed', error: err });
    res.status(201).json({ message: 'Customer created successfully', id: result.insertId });
  });
};

// Get all customers
const getAllCustomers = (req, res) => {
  customerModel.getAllCustomers((err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching customers', error: err });
    res.json(results);
  });
};

// Get customer by ID
const getCustomerById = (req, res) => {
  const id = req.params.id;
  customerModel.getCustomerById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching customer', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(result[0]);
  });
};

// Update customer
const updateCustomer = (req, res) => {
  const id = req.params.id;
  const { name, contact_info, address } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const updatedData = {
    name: name.trim(),
    contact_info: contact_info?.trim() || null,
    address: address?.trim() || null
  };

  customerModel.updateCustomer(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ message: 'Update failed', error: err });
    res.json({ message: 'Customer updated successfully' });
  });
};

// Delete customer
const deleteCustomer = (req, res) => {
  customerModel.deleteCustomer(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });
    res.json({ message: 'Customer deleted successfully' });
  });
};

// Search customer by name
const searchCustomerByName = (req, res) => {
  const { name } = req.params;
  customerModel.searchCustomerByName(name, (err, result) => {
    if (err) return res.status(500).json({ message: 'Search failed', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'No customers found with that name' });
    res.json(result);
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomerByName
};
