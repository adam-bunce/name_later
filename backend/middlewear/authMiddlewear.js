const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log(decodedToken);
                res.locals.userId = decodedToken.id;
                next();
            }
        });
    } else {
        res.status(400).send("not authorized");
    }
};

const checkForLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.locals.userId = null;
            next();
        } else {
            console.log("decoded token", decodedToken.id);
            res.locals.userId = decodedToken.id;
            next();
        }
    });
};

module.exports = { requireAuth, checkForLoggedIn };
