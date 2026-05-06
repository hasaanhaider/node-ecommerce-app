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

exports.getAddresses = async (req, res, next) => {
  const { error } = addressValidation.getAddressesValidation(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const userId = req.user.userId;
    const { page, limit } = req.query;

    const addresses = await addressService.getAddresses(userId, page, limit);
    res.status(200).json({ addresses });
  } catch (error) {
    next(error);
  }
};

exports.deleteAddress = async (req, res, next) => {
  const { error } = addressValidation.deleteAddressValidation(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const userId = req.user.userId;
    const addressId = parseInt(req.params.id, 10);
    await addressService.deleteAddress(userId, addressId);
    res.status(204).json({ message: "Address deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAddressById = async (req, res, next) => {
  const { error } = addressValidation.getAddressByIdValidation(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const userId = req.user.userId;
    const addressId = parseInt(req.params.id, 10);
    const address = await addressService.getAddressById(userId, addressId);
    res.status(200).json({ address });
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  const { error } = addressValidation.updateAddressValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const userId = req.user.userId;
    const addressId = parseInt(req.params.id, 10);
    const addressData = req.body;
    const updatedAddress = await addressService.updateAddress(
      userId,
      addressId,
      addressData,
    );
    res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
  } catch (error) {
    next(error);
  }
};
