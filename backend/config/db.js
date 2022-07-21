const { Sequelize } = require("sequelize");
require("dotenv").config();

// i should verify this connects before exporting
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_URL,
        dialect: "mysql",
    }
);

// need to access this alot
module.exports = sequelize;
