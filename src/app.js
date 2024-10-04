const express = require("express");

const app = express();

//this is known as request handleres
 app.use("/",(req,res)=>{
    res.send("hello from the server");
 });

app.listen(3000,()=>{
    console.log("Server Started")
})