const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Whiteboard = db.define("whiteboard", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
});

module.exports = Whiteboard;
