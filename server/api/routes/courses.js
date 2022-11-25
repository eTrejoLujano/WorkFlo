const router = require("express").Router();
const { checkUser, checkAdmin } = require("../middlewares");
module.exports = router;

const { addCourse, allCourses } = require("../controllers/courses");

router.get("/", allCourses);
router.post("/", checkUser, checkAdmin, addCourse);
