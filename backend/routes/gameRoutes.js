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
router.post("/", createGame); // should protect this route somehow (so users cant hit endpoint
// and make them have the insta highscore w/o playing)

module.exports = router;
