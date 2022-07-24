const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// protected
const getMe = async (req, res) => {
    console.log("locals", res.locals.userId); //makes no sense this is res lol
    console.log("jwt", req.cookies.jwt);

    // if no jwt cookei then leave
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

// maybe i can generalize the error handleing into one function then  make it middlewear
const handleErrors = (errors) => {
    errorMessages = { username: "", password: "", other: "" };
    console.log(errors);

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
            maxAge: 60 * 1000 * 60, // 60min
        }); // 3min
        res.status(201).json({ userId: user.id });
        // TODO add redirect to profile page or smth
    } catch (err) {
        const errors = handleErrors(err.errors);
        console.log(errors);
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
        console.log(err.message);
        const errors = handleLoginErrors(err.message);
        console.log(errors);
        res.status(400).json(errors);
    }
};

// make the cookie expire effectivley logging them out
const logoutUser = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1000 });
    // res.send("uhh uhh uhh "); // this somehow fixed the cookies not being made
    res.send("logged out"); // i need this for some reason or it just doesnt work ?
    res.status(200);
};

// TODO write a method specifaically for checking if a user is logged in

module.exports = { getMe, registerUser, loginUser, logoutUser };
