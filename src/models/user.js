const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      minLength: 3,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid EmailId "+ value )
        }
      }
    },
    password: {
      type: String,
      minLength: 6,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Not a Strong Password "+ value )
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(
            "Invalid gender value. It must be 'male', 'female', or 'others'."
          );
        }
      },
    },
    photoUrl: {
      type: String,
      // validate(value){
      //   if(!validator.isDataURI(value)){
      //     throw new Error("Invalid URL "+ value )
      //   }
      // },
      default:
        "https://depositphotos.com/vector/vector-user-icon-35717211.html",
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is the about section of the user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
