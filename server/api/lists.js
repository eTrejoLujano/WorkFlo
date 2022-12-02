const router = require("express").Router();
const {
  models: { List, User },
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

// POST /api/lists
// Add a list
router.post("/", requireToken, async (req, res, next) => {
  try {
    const list = await List.create(req.body);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

// PUT /api/lists
// Edit a lists name
router.put("/", requireToken, async (req, res, next) => {
  try {
    const list = await List.update(
      { title: req.body.title },
      {
        where: { id: req.body.id, projectId: req.body.projectId },
      }
    );
    res.json(list);
  } catch (error) {
    next(error);
  }
});
