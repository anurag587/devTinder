const express = require("express");
const connectDb = require("./config/database.js");
const app = express();

const User = require("./models/user");


app.use(express.json());

//Get User from email
app.get("/user",async (req,res)=>{
    const user = await User.findOne({emailId : req.body.emailId});
    try{
        res.send(user);
    }
    catch(err){
        res.status(400).send("Something went Wrong")
    }
})

//Feed API --> To get all users from DB 
app.get("/feed", async (req,res)=>{
    const users = await User.find({});
    try{
        res.send(users)
    }
    catch(err){
        res.status(400).send("Something went Wrong")
    }
})

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Data Saved");
  } catch (err) {
    res.status(400).send("Data not Saved");
  }
});

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
       // console.log(userId)
         await User.findByIdAndDelete(userId);
        res.send("User Deleted")
    }
    catch (err) {
        res.status(400).send("Data not Saved");
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
