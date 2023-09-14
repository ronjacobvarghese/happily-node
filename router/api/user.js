const express = require("express");
const router = express.Router();

const Session = require("../../models/Session");

router.get("/list_sessions", async (req, res) => {
  try {
    const time = new Date();

    console.log(time);

    const sessions = await Session.find({
      slotTime: { $gt: time },
    });

    res.status(200).json(sessions);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
