const {
  login,
  signup,
  getProfile,
} = require("../controllers/auth/auth.controller");
const {
  registerClient,
  createProject,
  createTask,
  listProject,
  listTask,
  getProject,
  listTeams,
  listUserType,
  deleteProject,
  listClient,
} = require("../controllers/projects/project.controller");
const {
  createUser,
  listUser,
  deleteUser,
} = require("../controllers/users/user.controller");
const checkAuthToken = require("../middleware/checkAuthToken");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", checkAuthToken, getProfile);
router.post("/client", checkAuthToken, registerClient);
router.get("/client/list", checkAuthToken, listClient);
router.post("/project", checkAuthToken, createProject);
router.post("/project/:project_id/task", checkAuthToken, createTask);
router.get("/project/list", checkAuthToken, listProject);
router.get("/project/:id/task/list", checkAuthToken, listTask);
router.get("/project/:id", checkAuthToken, getProject);
router.get("/teams", listTeams);
router.get("/user/types", listUserType);
router.delete("/project/delete/:id", checkAuthToken, deleteProject);
router.post("/user", checkAuthToken, createUser);
router.get("/user/list", checkAuthToken, listUser);
router.delete("/user/:id", checkAuthToken, deleteUser);

module.exports = router;
