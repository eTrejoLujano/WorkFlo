const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Project = db.define("project", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  heading: {
    type: Sequelize.STRING,
  },
  subHeading: {
    type: Sequelize.STRING,
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
});



module.exports = Project;
