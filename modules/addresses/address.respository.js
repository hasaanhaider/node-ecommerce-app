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