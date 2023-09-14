require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");

const auth = require("./router/api/auth");
const verifyJWT = require("./middleware/verifyJWT");

const user = require("./router/api/user");
const student = require("./router/api/student");
const dean = require("./router/api/dean");

const verifyRoles = require("./middleware/verifyRoles");
const ROLES_LIST = require("./config/roles_list");

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
connectDB();

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/api/auth", auth);
app.use(verifyJWT);

app.use("/api/user", user);

app.use(verifyRoles(ROLES_LIST.student));
app.use("/api/student", student);

app.use(verifyRoles(ROLES_LIST.dean));
app.use("/api/dean", dean);

//Listen through PORT only if mongoDB connection is `open`
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
