const router = require("express").Router();
const {
  models: { Project, UserProjects, User },
} = require("../db");

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const allProjects = async (req, res, next) => {
  try {
    const allProjects = await Project.findAll();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
};

const getProjectsByUser = async (req, res, next) => {
  try {
    const projects = await UserProjects.findAll({
      where: { userId: req.user.id },
    });
    const user = await User.findByPk(req.user.id, {
      include: Project,
    });

    res.json(user.projects);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({ ...req.body, id: req.user.id });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const getSingleProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    res.send(project);
  } catch (error) {
    next(error);
  }
};

router.get("/", allProjects);
router.get("/user-projects", requireToken, getProjectsByUser);
router.get("/:projectId", requireToken, getSingleProject);
