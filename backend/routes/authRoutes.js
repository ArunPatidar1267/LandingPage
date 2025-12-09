const express = require("express");
const {
    login,
    isLoggedIn,
    logout
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/me",protect, isLoggedIn);
router.post("/logout", logout);


module.exports = router;
