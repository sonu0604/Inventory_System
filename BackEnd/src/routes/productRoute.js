const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const upload=require('../middleware/upload');

router.post(
  "/products",
  authenticateToken,
  isAdmin,
  upload.single("product_image"),   // multer middleware
  productController.createProduct
);
router.get('/products', authenticateToken, productController.getAllProducts);
router.get('/products/:id', authenticateToken, productController.getProductById);
router.get('/products/search/:name', authenticateToken, productController.searchProductByName);
router.put(
  "/products/:id",
  authenticateToken,
  isAdmin,
  upload.single("product_image"),   // ✅ allow file in update too
  productController.updateProduct
);
router.delete('/products/:id', authenticateToken, isAdmin, productController.deleteProduct);

module.exports = router;
