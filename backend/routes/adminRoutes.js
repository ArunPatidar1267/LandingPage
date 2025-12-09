const express = require("express");
const {
  getClients,
  addClient,
  getProjects,
  addProject,
  getSubscribers,
  getUsers,
  uploadClient,
  uploadProject
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/clients", getClients);
router.get("/projects", getProjects);

router.post("/client", protect, uploadClient.single("image"), addClient);
router.post("/project", protect, uploadProject.single("image"), addProject);

router.get("/subscribers", protect, getSubscribers);
router.get("/form/user", protect, getUsers);

module.exports = router;
