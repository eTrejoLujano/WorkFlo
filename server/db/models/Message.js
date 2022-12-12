const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../db");

const Message = db.define(
  "message",
  {
    author: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    time: {
      type: Sequelize.STRING,
    },
  },
  {
    // isRead: {
    //   type: Sequelize.ENUM(["true", "false"]),
    //   defultValue: false,
    // },
  }
);

module.exports = Message;
