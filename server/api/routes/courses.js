const router = require("express").Router();

module.exports = router;

const { addCourse } = require("../controllers/courses");

router.post("/", addCourse);
