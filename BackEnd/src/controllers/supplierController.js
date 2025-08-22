const supplierModel = require("../models/supplierModel");

// Create Supplier
const createSupplier = (req, res) => {
  const { name, contact_info, address } = req.body;
  const created_by = req.user?.user_id;

  if (!name || !contact_info || !address || !created_by) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate contact_info (must be phone or email)
  if (
    !/^\d{10}$/.test(contact_info) &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_info)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid contact info (must be phone or email)" });
  }

  // ✅ Check duplicate supplier by exact name
  supplierModel.findSupplierByName(name.trim(), (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    if (result.length > 0)
      return res
        .status(409)
        .json({ message: "Supplier with same name already exists" });

    const data = {
      name: name.trim(),
      contact_info: contact_info.trim(),
      address: address.trim(),
      created_by,
    };

    supplierModel.createSupplier(data, (err2, result2) => {
      if (err2)
        return res.status(500).json({ message: "Insert failed", error: err2 });

      res
        .status(201)
        .json({ message: "Supplier created successfully", id: result2.insertId });
    });
  });
};

// Get all suppliers with pagination
const getAllSuppliers = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  supplierModel.getSuppliersWithPagination(limit, offset, (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    supplierModel.getSuppliersCount((err2, countResult) => {
      if (err2)
        return res.status(500).json({ message: "Count failed", error: err2 });

      const total = countResult[0].total;
      res.json({
        suppliers: result,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
        },
      });
    });
  });
};
const getAllSuppliersNoPagination = (req, res) => {
  supplierModel.getAllSuppliers((err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    res.json(result);
  });
};

// Search supplier by name with pagination
const searchSupplierByName = (req, res) => {
  const { name } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  supplierModel.searchSupplierByName(name, limit, offset, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Search failed", error: err });

    supplierModel.getSuppliersCount((err2, countResult) => {
      if (err2)
        return res.status(500).json({ message: "Count failed", error: err2 });

      const total = countResult[0].total;
      res.json({
        suppliers: result,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
        },
      });
    });
  });
};

// Get supplier by ID
const getSupplierById = (req, res) => {
  const { id } = req.params;

  supplierModel.getSupplierById(id, (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Supplier not found" });

    res.json(result[0]);
  });
};

// Update supplier
const updateSupplier = (req, res) => {
  const { id } = req.params;
  const { name, contact_info, address } = req.body;

  if (!name || !contact_info || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = {
    name: name.trim(),
    contact_info: contact_info.trim(),
    address: address.trim(),
  };

  supplierModel.updateSupplier(id, data, (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Supplier not found" });

    res.json({ message: "Supplier updated successfully" });
  });
};

// Delete supplier
const deleteSupplier = (req, res) => {
  const { id } = req.params;

  supplierModel.deleteSupplier(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Supplier not found" });

    res.json({ message: "Supplier deleted successfully" });
  });
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  searchSupplierByName,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getAllSuppliersNoPagination 
};

