const express = require("express");
const router = express.Router();
const {
    getMe,
    registerUser,
    loginUser,
    logoutUser,
} = require("../controllers/userController");

const {
    requireAuth,
    checkForLoggedIn,
} = require("../middlewear/authMiddlewear");

// /me should be protected w/ JWT AUTH middlewear
router.get("/me", requireAuth, getMe);

// public
router.post("/register", registerUser);

// public
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
