"use strict";

const { green, red } = require("chalk");
const {
  db,
  models: { User, Project, List, Card, UserCards, UserProjects },
} = require("../server/db");

const users = [
  {
    firstName: "cody",
    lastName: "smith",
    email: "cody@cody.com",
    password: "123",
    isAdmin: true,
    avatarURL: "/images/profilePic/erik.jpeg",
  },
  {
    firstName: "murphy",
    lastName: "O'Neil",
    email: "murphy@murphy.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/jerral.jpeg",
  },
];

const projects = [
  {
    title: "Project 1",
    complete: false,
  },
  {
    title: "Project 2",
  },
  {
    title: "Project 3",
    complete: false,
  },
  {
    title: "Project 4",
    complete: true,
  },
];

const lists = [
  {
    title: "Pre Work",
    projectId: 1,
  },
  {
    title: "Doing",
    projectId: 1,
  },
  {
    title: "Done",
    projectId: 1,
  },
  {
    title: "To do",
    projectId: 1,
  },
  {
    title: "Prep Work",
    projectId: 2,
  },
  {
    title: "In Progress",
    projectId: 2,
  },
  {
    title: "Post Work",
    projectId: 2,
  },
];

const cards = [
  {
    title: "card1",
    description: "description1",
    complete: false,
    listId: 1,
  },
  {
    title: "card2",
    description: "description2",
    complete: false,
    listId: 2,
  },
  {
    title: "card3",
    description: "description3",
    complete: true,
    listId: 3,
  },
  {
    title: "card4",
    description: "description4",
    complete: true,
    listId: 4,
  },
  {
    title: "card5",
    description: "description5",
    complete: false,
    listId: 5,
  },
  {
    title: "card6",
    description: "description6",
    complete: true,
    listId: 6,
  },
  {
    title: "card7",
    description: "description7",
    complete: false,
    listId: 7,
  },
];

const seeduserCards = [
  {
    userId: 1,
    cardId: 1,
  },
  {
    userId: 1,
    cardId: 2,
  },
  {
    userId: 1,
    cardId: 3,
  },
  {
    userId: 2,
    cardId: 4,
  },
  {
    userId: 2,
    cardId: 5,
  },
  {
    userId: 2,
    cardId: 6,
  },
];

const seeduserProjects = [
  {
    userId: 1,
    projectId: 1,
  },
  {
    userId: 1,
    projectId: 2,
  },
  {
    userId: 2,
    projectId: 1,
  },
  {
    userId: 2,
    projectId: 2,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );
    await Promise.all(
      lists.map((list) => {
        return List.create(list);
      })
    );
    await Promise.all(
      cards.map((card) => {
        return Card.create(card);
      })
    );
    await Promise.all(
      seeduserCards.map((userC) => {
        return UserCards.create(userC);
      })
    );
    await Promise.all(
      seeduserProjects.map((userP) => {
        return UserProjects.create(userP);
      })
    );
  } catch (err) {
    console.error(err);
  }
};

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
