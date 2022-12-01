const router = require("express").Router();
const {
  models: { List, User, Card },
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

// POST /api/cards
// Add a card
router.post("/", requireToken, async (req, res, next) => {
  try {
    const card = await Card.create(req.body);
    res.json(card);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cards
// Edit a cards name
router.put("/", requireToken, async (req, res, next) => {
  try {
    const card = await Card.update(
      { title: req.body.title },
      {
        where: { id: req.body.id, listId: req.body.listId },
      }
    );
    res.json(card);
  } catch (error) {
    next(error);
  }
});
