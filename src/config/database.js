const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://anuragusict09:UqRzEqUF5BswHLW8@cluster0.cz1c1.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
