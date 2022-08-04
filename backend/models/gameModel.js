const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/userModel");

const Game = sequelize.define("Game", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    accuracy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Game;
