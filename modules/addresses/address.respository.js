const prisma = require("../../config/db");

exports.createAddress = async (addressData) => {
  try {
    const newAddress = await prisma.address.create({
      data: addressData,
    });
    return newAddress;
  } catch (error) {
    throw error;
  }
};

exports.getAddresses = async (userId, offset, limit) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId },
      skip: offset,
      take: limit,
    });
    return addresses;
  } catch (error) {
    throw error;
  }
};

exports.getAddressById = async (addressId) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });
    return address;
  } catch (error) {
    throw error;
  }
};


exports.updateAddress = async (userId, addressId, addressData) => {
  try {
    console.log(userId, addressId);
    
    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });
    if (!address) {
      throw new ApiError(404, "Address not found");
    }
    if (address.userId !== userId) {
      throw new ApiError(403, "Access denied");
    }
    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: addressData,
    });
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};
