const epxress = require("express");
const router = epxress.Router();
const controller = require("./address.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

router.post("/create", authenticate, controller.createAddress);
// router.get("/", authenticate, controller.getAddresses);
// router.get("/:id", authenticate, controller.getAddressById);
// router.put("/:id", authenticate, controller.updateAddress);
// router.delete("/:id", authenticate, controller.deleteAddress);

module.exports = router;
