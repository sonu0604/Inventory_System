const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/categories/add", categoryController.createCategory);
router.get("/categories/view", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/update/:id", categoryController.updateCategory);
router.delete("/categories/delete/:id", categoryController.deleteCategory);
router.get("/categories/search:name=", categoryController.searchCategoryByName);

module.exports = router;
