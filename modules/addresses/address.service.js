const prisma = require("../../config/db");
const ApiError = require("../../utils/ApiError");
const addressRepository = require("../addresses/address.respository");



exports.createAddress = async (userId, addressData) => {
  try {
    const newAddress = await addressRepository.createAddress({
      userId,
      ...addressData,
    });
    return newAddress;
  } catch (error) {
    throw error;
  } 
};
