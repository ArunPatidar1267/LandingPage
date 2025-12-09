const User = require("../models/User.model");
const Project = require("../models/Project.model");
const Subscriber = require("../models/Subscriber.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads");
const clientsDir = path.join(uploadsDir, "clients");
const projectsDir = path.join(uploadsDir, "projects");

[uploadsDir, clientsDir, projectsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const clientStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, clientsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const projectStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, projectsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const uploadClient = multer({ storage: clientStorage });
const uploadProject = multer({ storage: projectStorage });

const getClients = async (req, res) => {
  try {
    const clients = await User.find({ userType: "client" }).select("-password");
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addClient = async (req, res) => {
  try {
    const { name, designation, description, email, mobile, area, city } = req.body;
    
    const newClient = await User.create({
      name,
      designation,
      description,
      email,
      userType: "client",
      image: req.file ? `uploads/clients/${req.file.filename}` : ""
    });

    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const newProject = await Project.create({
      name,
      description,
      image: req.file ? `uploads/projects/${req.file.filename}` : ""
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ isSubscribed: true });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: "user" }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  addClient,
  getProjects,
  addProject,
  getSubscribers,
  getUsers,
  uploadClient,
  uploadProject
};
