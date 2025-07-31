const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware.js');
router.post('/categories/add',authenticateToken,isAdmin, categoryController.createCategory);

// READ
router.get('/categories',authenticateToken,isAdmin, categoryController.getAllCategories);
router.get('/categories/:id', authenticateToken,isAdmin, categoryController.getCategoryById);
router.get('/categories/search/:name',authenticateToken,isAdmin, categoryController.getCategoryByName);

// UPDATE
router.put('/categories/update/:id',authenticateToken,isAdmin, categoryController.updateCategory);

// DELETE
router.delete('/categories/delete/:id',authenticateToken,isAdmin, categoryController.deleteCategory);

module.exports = router;