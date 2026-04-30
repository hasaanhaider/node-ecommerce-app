const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../../utils/email").sendEmail;
const prisma = require("../../config/db");
const authRepository = require("./auth.repository");
const ApiError = require("../../utils/ApiError");
const { user } = require("../../config/db");

exports.register = async (userData) => {
  try {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) throw new ApiError(400, "Email already in use");

    // normalize naming
    const password = userData.password;
    const confirmPassword =
      userData.confirmPassword || userData.password_confirmation;

    if (password !== confirmPassword) {
      throw new ApiError(400, "Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // clean payload (IMPORTANT)
    const newUser = await authRepository.createUser({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new ApiError(400, "Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ApiError(400, "Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return { token, user };
  } catch (error) {}
};

exports.userInfo = async (userId) => {
  try {
    const user = await authRepository.findUserByEmail(userId);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

exports.forgotPassword = async (email) => {
  try {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetCode: code,
        resetCodeExpiry: new Date(resetTokenExpiry),
      },
    });

    await sendEmail(
      email,
      "Password Reset Code",
      `Your password reset code is: ${code}`,
    );
  } catch (error) {
    throw error;
  }
};

exports.verifyCode = async (email, code) => {
  try {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");

    if (user.resetCode !== code) {
      throw new ApiError(400, "Invalid reset code");
    }
    if (user.resetCodeExpiry < new Date()) {
      throw new ApiError(400, "Reset code has expired");
    }
    return { message: "Code verified" };
  } catch (error) {
    throw error;
  }
};

exports.resetPassword = async (email, code, newPassword) => {
  try {
    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new ApiError(404, "User not found");
    if (user.resetCode !== code) throw new ApiError(400, "Invalid reset code");
    if (user.resetCodeExpiry < new Date())
      throw new ApiError(400, "Reset code has expired");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetCode: null,
        resetCodeExpiry: null,
      },
    });
  } catch (error) {
    throw error;
  }
};


exports.updateProfile = async (userEmail, updateData) => {

  try {
    const user = await authRepository.findUserByEmail(userEmail);
    if(!user) throw new ApiError(404, "User not found");
    const updatedUser = await authRepository.updateUserProfile(userEmail, updateData);
    return updatedUser;
  } catch (error) {
    throw error;
  }

}


exports.deleteAccount = async (userEmail, password) => {
  try {
    const user = await authRepository.findUserByEmail(userEmail);
    if(!user) throw new ApiError(404, "User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ApiError(400, "Invalid password");
    await prisma.user.delete({
      where: { email: userEmail },
    });

    return { message: "Account deleted successfully" };
  } catch (error) {
    throw error;
  }
};