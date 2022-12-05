const router = require("express").Router();
const {
  models: { Whiteboard, User },
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

router.post("/", requireToken, async (req, res, next) => {
  const whiteboard = await Whiteboard.create(req.body);
  res.json(whiteboard);
});

router.get("/:projectId", requireToken, async (req, res, next) => {
  const whiteboards = await Whiteboard.findAll({
    where: { projectId: req.params.projectId },
  });
  res.json(whiteboards);
});
