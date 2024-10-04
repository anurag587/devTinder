const express = require("express");

const app = express();

//this is known as request handlers and the order of req handlers are very important 
app.get("/user",(req,res)=>{
    res.send({
        firstName : "Anurag",
        lastName : "Sharma"
    });
 });

 app.post("/user",(req,res)=>{
    res.send("Saving the Data to DB");
 });

 app.delete("/user",(req,res)=>{
    res.send("Deleting the Data from DB");
 });

app.use("/test",(req,res)=>{
   res.send("testing the api calls");
});


app.listen(3000,()=>{
    console.log("Server Started")
})