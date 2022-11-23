const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const File = db.define('file', {
  visibility: {
    type: Sequelize.BOOLEAN,
  },
})

module.exports = File

