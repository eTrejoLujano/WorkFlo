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
  createdAt: {
    type: Sequelize.DATE,                  
    get() {
      let options = { 
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: 'numeric', minute: 'numeric' 
      };
      let dtFormat = new Intl.DateTimeFormat('en-US', options);
      return dtFormat.format(this.dataValues.createdAt)
    },
  },
  updatedAt: {
    type: Sequelize.DATE,                  
    get() {
      let options = { 
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: 'numeric', minute: 'numeric' 
      };
      let dtFormat = new Intl.DateTimeFormat('en-US', options);
      return dtFormat.format(this.dataValues.createdAt)
    },
  },
});

module.exports = Card;
