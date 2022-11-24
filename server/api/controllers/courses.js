const {
  models: { Course },
} = require("../../db");

const addCourse = async (req, res, next) => {
  try {
    const course = await Course.create({ title: "hello course" });
    res.json(course);
  } catch (error) {
    next(error);
  }
};

module.exports = { addCourse };
