const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Course = db.define("course", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // classType: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
});

module.exports = Course;
