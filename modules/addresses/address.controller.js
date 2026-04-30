
const addressService = require("./address.service");
const addressValidation = require("./address.validation");



exports.createAddress = async (req, res, next) => {
  try {
    const { error } = addressValidation.createAddressValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const userId = req.user.userId;
    const addressData = req.body;

    const newAddress = await addressService.createAddress(userId, addressData);
    res.status(201).json({ address: newAddress });
  } catch (error) {
    next(error);
  } 
};