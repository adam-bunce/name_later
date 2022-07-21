const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: { arg: true, msg: "Username must be unique" }, // was lowercase u before
            validate: {
                len: {
                    args: [1, 20],
                    msg: "Username must be between 1-20 characters",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 100],
                    msg: "Password must be between 6-100 characters",
                },
            },
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
    }
);

// TODO remve password from found user
User.login = async (username, password) => {
    const user = await User.findOne({ where: { username: username } });

    if (user) {
        const matches = await bcrypt.compare(password, user.password);

        if (matches) {
            // TODO only return needed parts of user (key ig)
            return user.dataValues;
        }
        throw Error("incorrect password");
    }
    throw Error("username does not exist");
};

module.exports = User;
