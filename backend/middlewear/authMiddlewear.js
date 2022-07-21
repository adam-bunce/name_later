const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.cookies);

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
        // res.redirect('/')
    }
};

const checkForLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log(decodedToken);
            // this should make it so i dont need to call jwt to
            // get the user id it should just be in locals (i g im still calling it)
            // but it makes it easier in the outer routes b/c this
            // would be repeated alot
            // res.locals.user = decodedToken.id;
            res.locals.user = "i am the glob go goo golab";
            res.locals.user = "testing testing";
            next();
        }
    });
};

module.exports = { requireAuth, checkForLoggedIn };
