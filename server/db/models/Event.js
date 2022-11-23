const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const Event = db.define('event', {
  eventType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bulletinBoard: {
    type: Sequelize.ENUM('priority', 'non-priority'),
  },
})

module.exports = Event

