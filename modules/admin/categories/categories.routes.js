const express = require("express");
const router = express.Router();
const controller = require("./categories.controller");
const { authenticate } = require("../../../middlewares/auth.middleware");
const { authorizeRoles } = require("../../../middlewares/isAdmin.middleware");

// Apply authentication and authorization middleware to all routes
router.use(authenticate);
router.use(authorizeRoles("admin"));

router.post("/create", controller.createCategory);
// router.get("/", controller.getCategories);
// router.delete("/delete/:id", controller.deleteCategory);
// router.get("/edit/:id", controller.getCategoryById);
// router.put("/update/:id", controller.updateCategory);

module.exports = router;
