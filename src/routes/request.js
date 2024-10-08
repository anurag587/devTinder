const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middleware/auth.js");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
      const user = req.user;
      res.send("Sent Connection successfully from "+  user.firstName);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

  module.exports = requestRouter
  