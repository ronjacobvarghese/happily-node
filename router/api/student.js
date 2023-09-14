const express = require("express");
const router = express.Router();

const Session = require("../../models/Session");

router.post("/book_session/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const time = new Date(req.body.date);

    const existingSession = await Session.findOne({
      slotTime: time,
      status: "pending",
    });

    if (!existingSession) {
      return res
        .status(400)
        .json({ message: "Session slot is not available." });
    }

    // Update the session to mark it as booked by the student
    existingSession.status = "booked";
    existingSession.student = id;

    await existingSession.save();

    res.json({ message: "Session booked successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
