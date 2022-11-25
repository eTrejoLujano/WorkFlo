const {
  models: { Course },
} = require("../../db");

const addCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (error) {
    next(error);
  }
};

const allCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

module.exports = { addCourse, allCourses };
