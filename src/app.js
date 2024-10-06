const express = require("express");
const connectDb = require("./config/database.js");
const app = express();

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
  const user = new User(req.body);
  const data = req.body;
  try {
    const userData = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "about",
      "gender",
      "skills",
      "photoUrl",
      "age",
    ];
    const dataAllowed = Object.keys(data).every((k) => userData.includes(k));
    if (!dataAllowed) {
      throw new Error("Must fill only field shown on the UI");
    }
    await user.save();
    res.send("User Data Saved");
  } catch (err) {
    res.status(400).send("Data not Saved" + err.message);
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
