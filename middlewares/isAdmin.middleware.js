const ApiError = require("../utils/ApiError");

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // ✅ Ensure user exists (auth middleware must run first)
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const userRole = req.user.role;

    // ✅ Ensure role exists
    if (!userRole) {
      return next(new ApiError(403, "User role not defined"));
    }

    // ✅ Check permission
    if (!allowedRoles.includes(userRole)) {
      return next(
        new ApiError(403, "Forbidden: You do not have access to this resource"),
      );
    }

    next();
  };
};
