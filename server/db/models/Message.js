const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../db");

const Message = db.define(
  "message",
  {
    message: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    defaultScope: {
      include: [{ model: User }],
    },
  }
);

module.exports = Message;
