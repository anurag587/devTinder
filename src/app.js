const express = require("express");
const connectDb = require("./config/database.js");
const app = express();
const { validatingSignUpUser } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { userAuth } = require("./middleware/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
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
connectDb()
  .then(() => {
    console.log("DataBase Successfully Connected");
    app.listen(3000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log("Database not connected");
  });
