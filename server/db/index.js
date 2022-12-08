//this is the access point for all things database related!

const db = require("./db");

const Project = require("./models/Project");
const Card = require("./models/Card");
const User = require("./models/User");
const List = require("./models/List");
const Message = require("./models/Message");
const UserCards = require("./models/UserCards");
const UserProjects = require("./models/UserProjects");
const Invite = require("./models/Invite");
const Whiteboard = require("./models/Whiteboard");

//associations could go here!
User.belongsToMany(Project, { through: UserProjects });
Project.belongsToMany(User, { through: UserProjects });

User.belongsToMany(Card, { through: UserCards });
Card.belongsToMany(User, { through: UserCards });

Project.hasMany(List);
List.belongsTo(Project);

List.hasMany(Card);
Card.belongsTo(List);

Project.hasMany(Invite);
Invite.belongsTo(Project);

Whiteboard.belongsTo(Project);
Project.hasMany(Whiteboard);

User.hasMany(Message);
Message.belongsTo(User);

Project.hasMany(Message);
Message.belongsTo(Project);

module.exports = {
  db,
  models: {
    Project,
    Card,
    User,
    List,
    UserCards,
    UserProjects,
    Invite,
    Whiteboard,
    Message,
  },
};
