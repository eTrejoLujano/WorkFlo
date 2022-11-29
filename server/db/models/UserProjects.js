const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Project = require("./Project");

const UserProjects = db.define("userProjects", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  projectId: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: "id",
    },
  },
});

module.exports = UserProjects;
