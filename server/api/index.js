const router = require("express").Router();
module.exports = router;

router.use("/lists", require("./lists"));
router.use("/projects", require("./projects"));
router.use("/users", require("./users"));
router.use("/cards", require("./cards"));
router.use("/invite", require("./invite"));
router.use("/userCards", require("./userCards"));
router.use("/whiteboard", require("./whiteboard"));
router.use("/chat", require("./chat"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
