const service = require("./auth.service");
const {
  registerValidateion,
  loginValidation,
  forgotPasswordValidation,
  verifyCodeValidation,
  resetPasswordValidation,
  updateProfileValidation,
  deleteAccountValidation,
} = require("./auth.validation");

exports.register = async (req, res, next) => {
  try {
    const { error } = registerValidateion(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await service.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const { token, user } = await service.login(email, password);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.userInfo = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log(req.user);

    const userEmail = req.user.email;

    const user = await service.userInfo(userEmail);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { error } = forgotPasswordValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email } = req.body;
    await service.forgotPassword(email);
    res.json({ message: "Password reset code sent to email" });
  } catch (error) {
    next(error);
  }
};

exports.verifyCode = async (req, res, next) => {
  try {
    const { error } = verifyCodeValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, code } = req.body;
    await service.verifyCode(email, code);
    res.json({ message: "Reset code verified successfully" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { error } = resetPasswordValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, code, newPassword } = req.body;
    await service.resetPassword(email, code, newPassword);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { error } = updateProfileValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userEmail = req.user.email;
    const updatedUser = await service.updateProfile(userEmail, req.body);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};


exports.deleteAccount = async (req, res, next) => {
  try {
    const { error } = deleteAccountValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userEmail = req.user.email;
    await service.deleteAccount(userEmail, req.body.password);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
}
