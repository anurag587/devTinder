const express = require("express");
const connectDb = require("./config/database.js");
const app = express();
const { validatingSignUpUser } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("./models/user");

app.use(express.json());

//Get User from email
app.get("/user", async (req, res) => {
  const user = await User.findOne({ emailId: req.body.emailId });
  try {
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

//Feed API --> To get all users from DB
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

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
    console.log(err.message);
    res.status(400).send("ERROR : " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // console.log(userId)
    await User.findByIdAndDelete(userId);
    res.send("User Deleted");
  } catch (err) {
    res.status(400).send("Data not Saved");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "gender",
      "about",
      "age",
      "skills",
      "userId",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("These are not allowed to update");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("Updated Successfully");
  } catch (err) {
    res.status(400).send("Data not Updated" + err.message);
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
