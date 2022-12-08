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
    const card = await Card.findOne({ where: { id: req.body.cardId } });
    await card.addUsers(req.body.userId);
    // const userCard = await UserCards.findOne({
    //   where: { cardId: req.body.cardId, userId: req.body.userId },
    // });
    const users = await card.getUsers();
    console.log("users :>> ", users[0].dataValues);

    ///can we send back a selectedCard here?
    // dispatch(selectedCard({ cardId, title, description, users }));

    res.json();
  } catch (error) {
    next(error);
  }
});

// PUT /api/userCards
// Remove user from card
router.put("/", requireToken, async (req, res, next) => {
  try {
    console.log("apiUserCardPut");
    const card = await Card.findOne({ where: { id: req.body.cardId } });
    await card.removeUsers(req.body.userId);
    res.json();
  } catch (error) {
    next(error);
  }
});
