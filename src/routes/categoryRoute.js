const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/categories', categoryController.createCategory);

// READ
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.get('/categories/name/:name', categoryController.getCategoryByName);

// UPDATE
router.put('/categories/:id', categoryController.updateCategory);

// DELETE
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
