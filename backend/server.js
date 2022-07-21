const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

var cors = require("cors");
const dbInit = require("./config/dbInit");
dbInit();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use("/users", require("./routes/userRoutes"));

const {
    requireAuth,
    checkForLoggedIn,
} = require("./middlewear/authMiddlewear");

// can remove thise
app.use("/test", requireAuth, (req, res) => {
    res.status(200).send(`got to the test route ${req.cookies.jwt}`);
});

// can remove this
app.use("/test2", requireAuth, checkForLoggedIn, (req, res) => {
    console.log("req locals", req.locals);
    console.log(req.locals);
    res.status(200).send(`got to the test route ${90}`);
});

app.listen(8000, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});
