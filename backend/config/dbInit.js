const User = require("../models/userModel");
const Game = require("../models/gameModel");

User.hasMany(Game);
Game.belongsTo(User);

const dbInit = async () => {
    await User.sync(); // returns promise so need to await this stuff makes the the db has the tables set up poperly if they arent already
    await Game.sync();
};

module.exports = dbInit;
