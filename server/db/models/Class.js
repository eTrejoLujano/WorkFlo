const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const Class = db.define('class', {
  classType: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Class

