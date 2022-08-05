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

// /games/top
// returns {all: [], pastDay: [] } of top 10 games
router.get("/top", getTopGames);

// /games/:id
// gets specific user's games. Must have valid JWT
router.get("/:id", requireAuth, getMyGames);

// /games
// creates a game, if there's a jwt the game is associated with the user
// otherwise it's an anon game
router.post("/", checkForLoggedIn, createGame);

module.exports = router;
