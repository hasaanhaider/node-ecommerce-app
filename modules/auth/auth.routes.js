const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", authenticate, controller.userInfo);

router.post("/forgot-password", controller.forgotPassword);
router.post('/verify-code', controller.verifyCode);
router.post('/reset-password', controller.resetPassword);


module.exports = router;
