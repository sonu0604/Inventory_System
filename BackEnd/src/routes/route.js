const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const upload = require("../middleware/upload");

// Register user with profile picture
router.post("/register", upload.single("picture"), controller.register);

// Login
router.post("/login", controller.login);
module.exports = router;




