const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Invite = db.define("invite", {
  hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Invite;
