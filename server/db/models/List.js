const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const List = db.define("list", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  listindex: {
    type: Sequelize.INTEGER,
  },
});

module.exports = List;
