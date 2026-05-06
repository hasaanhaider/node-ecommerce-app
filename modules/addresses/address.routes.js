const epxress = require("express");
const router = epxress.Router();
const controller = require("./address.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

router.post("/create", authenticate, controller.createAddress);
router.get("/", authenticate, controller.getAddresses);
router.delete("/delete/:id", authenticate, controller.deleteAddress);
router.get("/edit/:id", authenticate, controller.getAddressById);
router.put("/update/:id", authenticate, controller.updateAddress);

module.exports = router;
