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
  listHashId: {
    type: Sequelize.UUID,
    unique: true,
    isUUID: 4,
    defaultValue: Sequelize.UUIDV4,
  },
});

module.exports = List;
