const supplierModel = require('../models/supplierModel');

const createSupplier = (req, res) => {
  const { name, contact_info, address } = req.body;
  const created_by = req.user?.user_id;

  if (!name || !contact_info || !address || !created_by) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Optional: Check for duplicate supplier by name (you can skip this if not needed)
  supplierModel.searchSupplierByName(name.trim(), (err, result) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    if (result.length > 0) return res.status(409).json({ message: 'Supplier with same name already exists' });

    const data = {
      name: name.trim(),
      contact_info,
      address,
      created_by
    };

    supplierModel.createSupplier(data, (err, result) => {
      if (err) return res.status(500).json({ message: 'Insert failed', error: err });
      res.status(201).json({ message: 'Supplier created successfully', id: result.insertId });
    });
  });
};

const getAllSuppliers = (req, res) => {
  supplierModel.getAllSuppliers((err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching suppliers', error: err });
    res.json(results);
  });
};

const getSupplierById = (req, res) => {
  supplierModel.getSupplierById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching supplier', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Supplier not found' });
    res.json(result[0]);
  });
};

const updateSupplier = (req, res) => {
  const { id } = req.params;
  const { name, contact_info, address } = req.body;

  if (!name || !contact_info || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const updatedData = {
    name: name.trim(),
    contact_info,
    address
  };

  supplierModel.updateSupplier(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ message: 'Update failed', error: err });
    res.json({ message: 'Supplier updated successfully' });
  });
};

const deleteSupplier = (req, res) => {
  supplierModel.deleteSupplier(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });
    res.json({ message: 'Supplier deleted successfully' });
  });
};

const searchSupplierByName = (req, res) => {
  const { name } = req.params;
  supplierModel.searchSupplierByName(name, (err, result) => {
    if (err) return res.status(500).json({ message: 'Search failed', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'No suppliers found with that name' });
    res.json(result);
  });
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  searchSupplierByName
};
