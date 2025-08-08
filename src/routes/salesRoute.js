const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/sales/add", authenticateToken, isAdmin, salesController.createSales);
router.get("/sales/view", authenticateToken, isAdmin, salesController.getAllSales);
router.get("/sales/:id", authenticateToken, isAdmin, salesController.getSaleById);
router.put("/sales/update/:id", authenticateToken, isAdmin, salesController.updateSale);
router.delete("/sales/delete/:id", authenticateToken, isAdmin, salesController.deleteSale);
router.get("/sales/search", authenticateToken, isAdmin, salesController.searchSaleByInvoice);

module.exports = router;
