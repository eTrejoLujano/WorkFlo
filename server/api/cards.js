const router = require("express").Router();
const {
  models: { List, User, Card, Project },
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

// GET /api/cards/:projectId
router.get("/:projectId", requireToken, async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.projectId },
    });
    const cards = await Card.findAll({
      include: [
        { model: List, where: { projectId: project.id } },
        { model: User, }
      ],
    });
    res.json(cards);
  } catch (error) {
    next(error);
  }
});

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
// Edit a cards title and/or description
// router.put("/", requireToken, async (req, res, next) => {
//   try {
//     const card = await Card.update(
//       { title: req.body.title, description: req.body.description },
//       {
//         where: { id: req.body.id, listId: req.body.listId },
//       }
//     );
//     res.json(card);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/", requireToken, async (req, res, next) => {
  try {
    const card = await Card.update(
      { title: req.body.title, description: req.body.description },
      {
        where: { id: req.body.cardId, },
      }
    );
    res.json(card);
  } catch (error) {
    next(error);
  }
});
