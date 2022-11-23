const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const Message = db.define('message', {
  messageText: {
    type: Sequelize.TEXT,
  },
  read: {
    type: Sequelize.BOOLEAN,
  },
})

module.exports = Message

