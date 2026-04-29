const service = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    console.log(req);
    const user = await service.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
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
