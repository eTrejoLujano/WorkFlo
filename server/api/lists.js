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

// GET /api/lists/:listId/cards
// Fetch cards of a specific list
router.get("/:listId/cards", requireToken, async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: { listId: req.params.listId },
    });
    res.json(cards);
  } catch (error) {
    next(error);
  }
});

// POST /api/lists
// Add a list
router.post("/", requireToken, async (req, res, next) => {
  try {
    const totalListsInProject = await List.findAll({
      where: { projectId: req.body.projectId },
    });

    let theIndex = 0;

    if (totalListsInProject.length > 0) {
      let increaseOne = totalListsInProject.length;
      theIndex = increaseOne;
    }

    const list = await List.create({
      title: req.body.title,
      projectId: req.body.projectId,
      listindex: theIndex,
    });
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

// PUT /api/lists/order
// Edit the order of the lists
router.put("/order", requireToken, async (req, res, next) => {
  try {
    const theDifference = req.body.startingIndex - req.body.finishingIndex;

    if (theDifference < 0) {
      for (
        let i = req.body.startingIndex + 1;
        i <= req.body.finishingIndex;
        i++
      ) {
        const list = await List.findOne({
          where: { cardindex: i, projectId: req.body.projectId },
        });
        await List.update(
          {
            listindex: Sequelize.literal("listIndex - 1"),
          },
          { where: { id: list.id } }
        );
      }
      const movingList = await List.update(
        { listindex: req.body.finishingIndex },
        { where: { id: req.body.listDragId } }
      );
      const lists = await List.findAll({
        include: [{ model: Project }],
        order: [
          ["projectId", "ASC"],
          ["listindex", "ASC"],
        ],
      });
      res.json(lists);
    }
    if (theDifference > 0) {
      for (
        let i = req.body.startingIndex - 1;
        i >= req.body.finishingIndex;
        i--
      ) {
        const list = await List.findOne({
          where: { listindex: i, projectId: req.body.projectId },
        });
        await List.update(
          {
            listindex: Sequelize.literal("listIndex + 1"),
          },
          { where: { id: list.id } }
        );
      }
      const movingList = await List.update(
        { listindex: req.body.finishingIndex },
        { where: { id: req.body.listDragId } }
      );
      const lists = await List.findAll({
        include: [{ model: Project }],
        order: [
          ["projectId", "ASC"],
          ["listindex", "ASC"],
        ],
      });
      res.json(lists);
    }
  } catch (error) {
    next(error);
  }
});
