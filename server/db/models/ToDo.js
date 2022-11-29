const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const ToDo = db.define('toDo', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = ToDo

