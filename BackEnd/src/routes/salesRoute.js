const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// router.post("/sales/add", authenticateToken, isAdmin, salesController.createSales);
// router.get("/sales/view", authenticateToken, isAdmin, salesController.getAllSales);
// router.get("/sales/:id", authenticateToken, isAdmin, salesController.getSaleById);
// router.put("/sales/update/:id", authenticateToken, isAdmin, salesController.updateSale);
// router.delete("/sales/delete/:id", authenticateToken, isAdmin, salesController.deleteSale);
// router.get("/sales/search", authenticateToken, isAdmin, salesController.searchSaleByInvoice);

router.get("/sales/products", authenticateToken, isAdmin, salesController.listProductsWithAvailability);
router.get("/sales/consumers", authenticateToken,isAdmin,  salesController.listConsumers);

// --- Create sale (invoice auto) ---
router.post("/sales", authenticateToken,isAdmin,  salesController.createSale);
router.get("/sales", authenticateToken, isAdmin, salesController.getAllSales);
router.get("/sales/search", authenticateToken, isAdmin, salesController.searchSales);
router.put("/sales/:id", authenticateToken, isAdmin, salesController.updateSale);
router.delete("/sales/:id", authenticateToken, isAdmin, salesController.deleteSale);

// --- Invoice PDF ---
router.get("/sales/invoice/:id", authenticateToken, isAdmin, salesController.downloadInvoice);

router.get(
  "/sales/download/pdf",
  authenticateToken,
  isAdmin,
  salesController.downloadAllSalesPDF
);
module.exports = router;
