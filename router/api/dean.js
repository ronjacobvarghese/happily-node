const express = require("express");
const router = express.Router();

const Session = require("../../models/Session");

router.post("/create_session/:id", async (req, res) => {
  try {
    const date = new Date(req.body.date);

    !date && res.status(400).json("Invalid Date!!");

    const id = req.params.id;
    !id && res.status(400).json("no user id");

    const existingSession = await Session.findOne({
      slotTime: date,
      dean: id,
    });

    if (existingSession) {
      return res.status(400).json("Session already exists");
    }

    const newSession = new Session({
      dean: id,
      slotTime: date,
    });

    await newSession.save();

    res.status(200).json(newSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
