const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/categories/add', categoryController.createCategory);

// READ
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.get('/categories/search/:name', categoryController.getCategoryByName);

// UPDATE
router.put('/categories/update/:id', categoryController.updateCategory);

// DELETE
router.delete('/categories/delete/:id', categoryController.deleteCategory);

module.exports = router;
