const { parse } = require("dotenv");
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

exports.getAddresses = async (userId, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const addresses = await addressRepository.getAddresses(
      userId,
      offset,
      limit,
    );
    return addresses;
  } catch (error) {
    throw error;
  }
};

exports.deleteAddress = async (userId, addressId) => {
  try {
    const address = await addressRepository.getAddressById(parseInt(addressId, 10));
    if (!address) {
      throw new ApiError(404, "Address not found");
    }
    if (address.userId !== userId) {
      throw new ApiError(403, "Access denied");
    }
    await prisma.address.delete({
      where: { id: addressId },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

exports.getAddressById = async (userId, addressId) => {
  try {
    const address = await addressRepository.getAddressById(addressId);
    if (!address) {
      throw new ApiError(404, "Address not found");
    }
    if (address.userId !== userId) {
      throw new ApiError(403, "Access denied");
    }
    return address;
  } catch (error) {
    throw error;
  }
};


exports.updateAddress = async (userId, addressId, addressData) => {
  try {
    const address = await addressRepository.getAddressById(addressId);
    if (!address) {
      throw new ApiError(404, "Address not found");
    }
    if (address.userId !== userId) {
      throw new ApiError(403, "Access denied");
    }
    const updatedAddress = await addressRepository.updateAddress(
      userId,
      addressId,
      addressData,
    );
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};
