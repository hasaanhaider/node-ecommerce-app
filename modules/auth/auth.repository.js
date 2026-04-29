const prisma = require('../../config/db'); // ✅ IMPORTANT

exports.createUser  = async (userData) => {
    try {
        const user = await prisma.user.create({
            data: userData
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};

exports.findUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
        
    } catch (error) {
        throw error;
    }
}