const express = require("express");
const router = express.Router();

const {
    requireAuth,
    checkForLoggedIn,
} = require("../middlewear/authMiddlewear");

const {
    getTopGames,
    getMyGames,
    createGame,
} = require("../controllers/gameController");

router.get("/", getTopGames);
router.get("/:id", requireAuth, getMyGames);
router.post("/", checkForLoggedIn, createGame);

module.exports = router;
