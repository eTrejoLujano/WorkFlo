const {
  models: { User },
} = require("../../db");

const checkUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      req.user = await User.findByToken(token);
      next();
    } else {
      res.status(401).json({ error: "Must be a logged in user" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkUser;
