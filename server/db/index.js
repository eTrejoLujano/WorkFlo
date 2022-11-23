//this is the access point for all things database related!

const db = require('./db')

const Class = require('./models/Class')
const Event = require('./models/Event')
const File = require('./models/File')
const Message = require('./models/Message')
const User = require('./models/User')

//associations could go here!
User.belongsToMany(Class, {through: 'UserClasses'})
Class.belongsToMany(User, {through: 'UserClasses'})

User.belongsToMany(Event, {through: 'UserEvents'})
Event.belongsToMany(User, {through: 'UserEvents'})

// User.hasMany(Message)
// Message.belongsTo(User)

User.belongsToMany(File, {through: 'UserFiles'})
File.belongsToMany(User, {through: 'UserFiles'})

module.exports = {
  db,
  models: {
    Class,
    Event,
    File,
    Message,
    User,
  },
}
