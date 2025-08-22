const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Purchases CRUD
router.post("/purchase/add", authenticateToken, isAdmin, purchaseController.createPurchase);
router.get("/purchases/", purchaseController.getAllPurchases);

// 🔍 Search Purchases
router.get("/purchases/search", purchaseController.searchPurchases);

// ✏️ Update Purchase
router.put("/purchases/:id", purchaseController.updatePurchase);

// ❌ Delete Purchase
router.delete("/purchases/:id", purchaseController.deletePurchase);
// 📄 Download Invoice PDF
router.get("/purchases/invoice/:id", purchaseController.downloadInvoice);

module.exports = router;
