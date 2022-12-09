const router = require("express").Router();
const { message } = require("antd");
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

router.get("/", requireToken, async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        userId: req.user.id,
      },
    });
    console.log("messages==>", messages);
    res.json(messages);
  } catch (error) {
    next(error);
  }
});
