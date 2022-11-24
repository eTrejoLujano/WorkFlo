//this is the access point for all things database related!

const db = require("./db");

const Course = require("./models/Course");
const Event = require("./models/Event");
const File = require("./models/File");
const Message = require("./models/Message");
const User = require("./models/User");

//associations could go here!
User.belongsToMany(Course, { through: "UserCourses" });
Course.belongsToMany(User, { through: "UserCourses" });

User.belongsToMany(Event, { through: "UserEvents" });
Event.belongsToMany(User, { through: "UserEvents" });

// User.hasMany(Message)
// Message.belongsTo(User)

User.belongsToMany(File, { through: "UserFiles" });
File.belongsToMany(User, { through: "UserFiles" });

module.exports = {
  db,
  models: {
    Course,
    Event,
    File,
    Message,
    User,
  },
};
