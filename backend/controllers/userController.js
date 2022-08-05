const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// protected
const getMe = async (req, res) => {
    // if no jwt cookie then leave
    if (req.cookies.jwt) {
        jwt.verify(
            req.cookies.jwt,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                const user = await User.findOne({
                    where: { id: decoded.id },
                    attributes: { exclude: ["password"] },
                });
                res.json({ user: user });
            }
        );
    } else {
        res.redirect("http://localhost:3000/login");
    }
};

const handleErrors = (errors) => {
    errorMessages = { username: "", password: "", other: "" };

    if (errors) {
        for (const err of errors) {
            if (err.path === "username" || err.path === "password") {
                errorMessages[err.path] = err.message;
            } else {
                errorMessages["other"] = err.message;
            }
        }
    }

    return errorMessages;
};

const handleLoginErrors = (error) => {
    errorMessages = { username: "", password: "", other: "" };

    if (error.includes("username")) {
        errorMessages["username"] = error;
    } else if (error.includes("password")) {
        errorMessages["password"] = error;
    } else {
        errorMessages["other"] = error;
    }

    return errorMessages;
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({
            username: username,
            password: password,
        });

        // generate JWT and add to cookies, then redirect
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 1000 * 5,
        });
        console.log("token", token);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 60 * 1000 * 60, // remain logged in for 1hr
        });
        res.status(201).json({ userId: user.id, username: user.username });
    } catch (err) {
        const errors = handleErrors(err.errors);
        res.status(400).json(errors);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 1000 * 5,
            });
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            });

            res.send(user);
            res.status(200);
        }
    } catch (err) {
        const errors = handleLoginErrors(err.message);
        res.status(400).json(errors);
    }
};

// make the cookie expire effectively logging them out
const logoutUser = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1000 });
    res.send("logged out"); // i need this for some reason or it just doesnt work ?
    res.status(200);
};

module.exports = { getMe, registerUser, loginUser, logoutUser };
