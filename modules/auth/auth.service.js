const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("./auth.repository");
const ApiError = require("../../utils/ApiError");
const { user } = require("../../config/db");

exports.register = async (userData) => {
  try {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) throw new ApiError(400, "Email already in use");

    // normalize naming
    const password = userData.password;
    const confirmPassword = userData.confirmPassword || userData.password_confirmation;

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
