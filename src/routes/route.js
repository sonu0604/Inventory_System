const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const upload = require("../middlewares/upload"); // import multer config
// POST /api/register
router.post("/register", upload.single("picture"), controller.register);

// POST /api/login
router.post('/login', controller.login);

module.exports = router;



