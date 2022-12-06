const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

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
  cardindex: {
    type: Sequelize.INTEGER,
  },
  cardHashId: {
    type: Sequelize.UUID,
    unique: true,
    isUUID: 4,
    defaultValue: Sequelize.UUIDV4,
  },
});

module.exports = Card;
