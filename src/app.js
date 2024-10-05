const express = require("express");
const connectDb = require("./config/database.js");
const app = express();

const User = require("./models/user");

app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName : "Anurag",
        lastName : "Sharma",
        emailId : "anuragusict09@gmail.com",
        password : "anurag@1230",
        age: 24,
        gender : "male"
    })
    try{
        await user.save();
    res.send("User Data Saved")
    }
    catch(err){
        res.status(400).send("Data not Saved")
    }
})


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
