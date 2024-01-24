const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === "admin") {
      next();
    } else {
      res
        .status(403)
        .json({ error: "Access denied. Only admin users are allowed." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking admin privileges" });
  }
};

module.exports = authMiddleware;
