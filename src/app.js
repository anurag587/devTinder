const express = require("express");
const connectDb = require("./config/database.js");
const app = express();

const User = require("./models/user");


app.use(express.json());


app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Data Saved");
  } catch (err) {
    res.status(400).send("Data not Saved");
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
