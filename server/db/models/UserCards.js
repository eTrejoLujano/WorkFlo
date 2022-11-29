const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Card = require("./Card");

const UserCards = db.define("userCards", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  cardId: {
    type: Sequelize.INTEGER,
    references: {
      model: Card,
      key: "id",
    },
  },
});

module.exports = UserCards;
