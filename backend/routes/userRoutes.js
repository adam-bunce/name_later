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

// /users/me
// gets specifc user's information, must have valid JWT
router.get("/me", requireAuth, getMe);

// /users/register
// add new user to database
router.post("/register", registerUser);

// /users/login
// create jwt for user authentication/authorization
router.post("/login", loginUser);

// user/logout
// deletes jwt to log out user
router.get("/logout", logoutUser);

module.exports = router;
