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
app.use("/games", require("./routes/gameRoutes"));

const {
    requireAuth,
    checkForLoggedIn,
} = require("./middlewear/authMiddlewear");

app.listen(8000, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});
