const User = require("../models/userModel");

const dbInit = async () => {
    await User.sync(); // returns promise so need to await this stuff makes the the db has the tables set up poperly if they arent already
};

module.exports = dbInit;
