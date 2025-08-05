const Supplier = require('../models/supplierModel');

exports.createSupplier = (req, res) => {
  const data = {
    name: req.body.name,
    contact_info: req.body.contact_info,
    address: req.body.address,
    created_by: req.user.user_id  // from token
  };

  if (!data.name || !data.contact_info || !data.address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Supplier.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Supplier added", id: result.insertId });
  });
};

exports.getAllSupplier = (req, res) => {
  Supplier.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

exports.getSupplierById = (req, res) => {
  Supplier.findById(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ message: "Supplier not found" });
    res.json(rows[0]);
  });
};

exports.updateSupplier = (req, res) => {
  const id = req.params.id;
  const { name, contact_info, address } = req.body;

  Supplier.update(id, { name, contact_info, address }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Supplier updated" });
  });
};

exports.deleteSupplier = (req, res) => {
  Supplier.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Supplier deleted" });
  });
};


exports.searchSupplierByNameParam = (req, res) => {
  const name = req.params.name;
  Supplier.searchByName(name, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ message: "No suppliers found with that name" });
    res.json(rows);
  });
};


// exports.searchSupplierByName = (req, res) => {
//   const { name } = req.query;
//   Supplier.searchByName(name, (err, rows) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(rows);
//   });
// };
