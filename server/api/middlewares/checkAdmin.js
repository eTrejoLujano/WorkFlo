const checkAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ error: "Must be an admin" });
  }
};

module.exports = checkAdmin;
