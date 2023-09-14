const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/User");

router.post("/register/:role", async (req, res) => {
  try {
    const role = req.params.role;

    if (role !== "student" && role !== "dean") {
      return res.status(400).json("Invalid role");
    }

    const fetched_user = await User.find({
      $or: [{ universityID: req.body.universityID }, { name: req.body.name }],
    });

    if (fetched_user.length != 0) {
      console.log(fetched_user);
      return res.status(500).json(role + " already exist");
    }

    const cryptsalt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, cryptsalt);

    const newUser = new User({
      universityID: req.body.universityID,
      name: req.body.name,
      password: hashedpass,
    });

    newUser.save().then((user) => res.status(200).json(user));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login/:role", async (req, res) => {
  try {
    const role = req.params.role;

    if (role !== "student" && role !== "dean") {
      return res.status(400).json("Invalid Role!!");
    }

    const user = await User.findOne({
      universityID: req.body.universityID,
    });

    !user && res.status(404).json(role + " not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);

    !validPass && res.status(400).json("Wrong Password");

    //Create the JWT
    const accessToken = jwt.sign(
      {
        name: user.name,
        roles: role === "student" ? ["1111"] : ["1111", "2222"],
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const result = await user.save();
    // Send authorization roles and access token to user
    res.status(200).json({ result, accessToken });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
