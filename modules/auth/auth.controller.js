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
