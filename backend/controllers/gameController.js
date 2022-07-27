const Game = require("../models/gameModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

// top games in last day
const getTopGames = async (req, res) => {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();

    const games = await Game.findAll({
        where: {
            createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW },
        },
        attributes: ["score"],
        include: [{ model: User, attributes: ["username"] }],
        order: [["score", "DESC"]],
        limit: 10,
    });

    res.send(games).status(200);
};

const getMyGames = async (req, res) => {
    await Game.findAll({
        where: { userId: req.params.id },
        attributes: {
            exclude: ["id", "userId", "UserId", "updatedAt"], //TODO fix the fact there's two user id's (probably from init file belongs to )
        },
    })
        .then((response) => {
            console.log("response", response);
            res.send(response);
            res.status(200);
        })
        .catch((err) => {
            res.send(err);
            res.status(400);
        });
};

const createGame = async (req, res) => {
    const { userId, score } = req.body;
    await Game.create({
        userId,
        score,
    })
        .then((response) => {
            res.send(`Game ${response.id} created`);
            res.status(200);
        })
        .catch((err) => {
            res.send(err);
            res.status(400);
        });
};

module.exports = { getTopGames, getMyGames, createGame };
