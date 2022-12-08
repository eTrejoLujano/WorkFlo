const router = require("express").Router();
const {
  models: { User, Message },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// POST /api/userCards
// Assign user to card
router.post("/", requireToken, async (req, res, next) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      userId: req.user.id,
    });

    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});
