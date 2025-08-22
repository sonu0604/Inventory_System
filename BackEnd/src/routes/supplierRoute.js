const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const {authenticateToken , isAdmin } = require("../middleware/authMiddleware");

router.post("/supplier/add", authenticateToken, isAdmin, supplierController.createSupplier);
router.get("/supplier/view", authenticateToken, isAdmin, supplierController.getAllSuppliers);
router.get("/supplier/:id", authenticateToken, isAdmin, supplierController.getSupplierById);
router.put("/supplier/update/:id", authenticateToken, isAdmin, supplierController.updateSupplier);
router.delete("/supplier/delete/:id", authenticateToken, isAdmin, supplierController.deleteSupplier);
router.get("/supplier/search/:name", authenticateToken, isAdmin, supplierController.searchSupplierByName);
router.get("/suppliers", authenticateToken, isAdmin, supplierController.getAllSuppliersNoPagination);
// router.get("/supplier/search", authenticateToken, isAdmin, supplierController.searchSupplierByName);

module.exports = router;

