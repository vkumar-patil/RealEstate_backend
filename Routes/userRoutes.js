const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/Register", userController.Register);
router.post("/login", userController.login);
router.get("/userdetails", userController.getUserDetails);
module.exports = router;
