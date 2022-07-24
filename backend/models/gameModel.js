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
    // foreign key (user has many games)
    // if its null then anon user
    // if this doesnt exist then the use was play w/o an account so anon on frontend
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Game;
