const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customersController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Create customer
router.post("/customer/add", authenticateToken, isAdmin, customerController.createCustomer);

// View all customers
router.get("/customer/view", authenticateToken, isAdmin, customerController.getAllCustomers);

// Get customer by ID
router.get("/customer/:id", authenticateToken, isAdmin, customerController.getCustomerById);

// Update customer
router.put("/customer/update/:id", authenticateToken, isAdmin, customerController.updateCustomer);

// Delete customer
router.delete("/customer/delete/:id", authenticateToken, isAdmin, customerController.deleteCustomer);

// Search customer by name
router.get("/customer/search/:name", authenticateToken, isAdmin, customerController.searchCustomerByName);

module.exports = router;
