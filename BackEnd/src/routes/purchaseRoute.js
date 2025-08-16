const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/purchase/add", authenticateToken, isAdmin, purchaseController.createPurchase);
router.get("/purchase/view", authenticateToken, isAdmin, purchaseController.getAllPurchases);
router.get("/purchase/:id", authenticateToken, isAdmin, purchaseController.getPurchaseById);
router.put("/purchase/update/:id", authenticateToken, isAdmin, purchaseController.updatePurchase);
router.delete("/purchase/delete/:id", authenticateToken, isAdmin, purchaseController.deletePurchase);
router.get("/purchase/search", authenticateToken, isAdmin, purchaseController.searchPurchaseByInvoice);

module.exports = router;
