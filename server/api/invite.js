const router = require("express").Router();
const {
  models: { Invite, User },
} = require("../db");

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

router.get("/:projectId", requireToken, async (req, res, next) => {
  try {
    const allHash = await Invite.findAll({
      where: {
        projectId: req.params.projectId,
      },
    });
    res.json(allHash);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const link = await Invite.create({
      hash: req.body.hash,
      projectId: req.body.projectId,
    });
    res.json(link);
  } catch (error) {
    next(error);
  }
});
