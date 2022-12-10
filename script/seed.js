"use strict";

const { green, red } = require("chalk");
const {
  db,
  models: { User, Project, List, Card, UserCards, UserProjects },
} = require("../server/db");

const users = [
  {
    firstName: "Cody",
    lastName: "Smith",
    email: "cody@cody.com",
    password: "123",
    isAdmin: true,
    avatarURL: "/images/profilePic/cody.jpeg",
  },
  {
    firstName: "Murphy",
    lastName: "Brown",
    email: "murphy@murphy.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/murphy.jpeg",
  },
  {
    firstName: "Jonatha",
    lastName: "Brooke",
    email: "jonatha@jonatha.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/jonatha.png",
  },
  {
    firstName: "Katie",
    lastName: "Crutchfield",
    email: "katie@katie.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/katie.jpeg",
  },
  {
    firstName: "Jerry",
    lastName: "Joseph",
    email: "jerry@jerry.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/jerry.jpeg",
  },
  {
    firstName: "Maia",
    lastName: "Sharpe",
    email: "maia@maia.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/maia.jpeg",
  },
];

const projects = [
  {
    title: "Track List",
    complete: false,
  },
];

const lists = [
  {
    title: "Record",
    projectId: 1,
    listindex: 0,
  },
  {
    title: "Edit",
    projectId: 1,
    listindex: 1,
  },
  {
    title: "Finished",
    projectId: 1,
    listindex: 2,
  },
];

const cards = [
  {
    title: "Vocals",
    description: "description1",
    complete: false,
    cardindex: 1,
    listId: 1,
  },
  {
    title: "BGV",
    description: "description2",
    complete: false,
    cardindex: 2,
    listId: 1,
  },
  {
    title: "AcGtr",
    description: "description3",
    complete: true,
    cardindex: 3,
    listId: 1,
  },
  {
    title: "ElGtr1",
    description: "description4",
    complete: true,
    cardindex: 0,
    listId: 1,
  },
  {
    title: "ElGtr2",
    description: "description5",
    complete: false,
    cardindex: 1,
    listId: 2,
  },
  {
    title: "Organ",
    description: "description6",
    complete: true,
    cardindex: 0,
    listId: 2,
  },
  {
    title: "Rhodes",
    description: "description7",
    complete: false,
    cardindex: 0,
    listId: 3,
  },
  {
    title: "Bass",
    description: "description6",
    complete: true,
    cardindex: 1,
    listId: 3,
  },
  {
    title: "Drums",
    description: "description7",
    complete: false,
    cardindex: 2,
    listId: 3,
  },
];

const seeduserCards = [
  {
    userId: 1,
    cardId: 1,
  },
  {
    userId: 2,
    cardId: 2,
  },
  {
    userId: 3,
    cardId: 3,
  },
  {
    userId: 4,
    cardId: 4,
  },
  {
    userId: 5,
    cardId: 5,
  },
  {
    userId: 6,
    cardId: 6,
  },
  {
    userId: 4,
    cardId: 7,
  },
  {
    userId: 5,
    cardId: 8,
  },
  {
    userId: 6,
    cardId: 9,
  },
];

const seeduserProjects = [
  {
    userId: 1,
    projectId: 1,
  },
  {
    userId: 2,
    projectId: 1,
  },
  {
    userId: 3,
    projectId: 1,
  },
  {
    userId: 4,
    projectId: 1,
  },
  {
    userId: 5,
    projectId: 1,
  },
  {
    userId: 6,
    projectId: 1,
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
