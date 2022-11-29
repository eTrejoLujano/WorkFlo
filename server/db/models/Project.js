const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Project = db.define("project", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Project;
