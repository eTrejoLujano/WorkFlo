//this is the access point for all things database related!

const db = require('./db')

const Project = require('./models/Project')
const ToDo = require('./models/ToDo')
const User = require('./models/User')

//associations could go here!
User.belongsToMany(Project, {through: 'UserProjects'})
Project.belongsToMany(User, {through: 'UserProjects'})

User.belongsToMany(ToDo, {through: 'UserToDos'})
ToDo.belongsToMany(User, {through: 'UserToDos'})

Project.hasMany(ToDo)
ToDo.belongsTo(Project)


module.exports = {
  db,
  models: {
    Project,
    ToDo,
    User,
  },
}
