const express = require("express");
const router = express.Router();

const {
    getTopGames,
    getMyGames,
    createGame,
} = require("../controllers/gameController");

// might need to be post requests b/c need auth for *MY
router.get("/", getTopGames);
router.get("/:id", getMyGames); // id is user id (should be in redux state)
router.post("/", createGame); // should protect this route somehow (so users cant hit endpoint
// and make them have the insta highscore w/o playing)

module.exports = router;
