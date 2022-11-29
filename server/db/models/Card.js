const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Card = db.define("card", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Card;
