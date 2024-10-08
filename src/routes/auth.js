const express = require("express");
const authRouter = express.Router();

const { validatingSignUpUser } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of User

    validatingSignUpUser(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypting the Password
    const passwordHash = await bcrypt.hash(password, 10);

    //Creating an Instance of the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Data Saved");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    //Creating JWT Token
    else {
      const token = await jwt.sign({ _id: user.id }, "secret_key", {
        expiresIn: "1d", //tells us in how much time token should expire
      });
      //Add token to cookie and send back to user
      res.cookie("token", token);
      res.send("LogIn Successfully!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  //Just Deleting the cookies from the client browser and the user will automatically logout
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Successfull!!");
});

authRouter.patch("/resetPassword", async (req, res) => {
  try {
    const { emailId, newPassword } = req.body;

    const currentUser = await User.find({ emailId });
    console.log(currentUser);

    if (!currentUser) {
      res.status(400).send("Invalid Credentials");
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);

    currentUser.password = newHashPassword;
    console.log(currentUser.password);
    await User.updateOne({ emailId }, { password: newHashPassword });
    //console.log("hello");

    res.send("Password Successfully Updated");
  } catch (err) {
    res.status(400).send("Error in Reseting Password " + err);
  }
});
module.exports = authRouter;
