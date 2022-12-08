const router = require("express").Router();
const {
  models: { User, Card, UserCards },
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
    let card = await Card.findOne({ where: { id: req.body.cardId } });
    await card.addUsers(req.body.userId);
    card = await Card.findOne({ 
      where: { id: req.body.cardId }, 
      // attributes: ['id', 'cardId'],
      include: User
    });
    res.json(card);
  } catch (error) {
    next(error);
  }
});

// PUT /api/userCards
// Remove user from card
router.put("/", requireToken, async (req, res, next) => {
  try {
    let card = await Card.findOne({ where: { id: req.body.cardId } });
    await card.removeUsers(req.body.userId);
    card = await Card.findOne({ 
      where: { id: req.body.cardId }, 
      // attributes: ['id', 'cardId'],
      include: User
    });
    res.json(card);
  } catch (error) {
    next(error);
  }
});
