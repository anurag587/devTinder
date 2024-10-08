const validator = require("validator");

const validatingSignUpUser = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter valid firstName and lastName");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid EmailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter Strong Password");
  }
};

const validatingEditProfile = (req) => {
  try {
    const ALLOWED_EDITS = [
      "firstnName",
      "lastName",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isEditableItems = Object.keys(req.body).every((fields) =>
      ALLOWED_EDITS.includes(fields)
    );
    return isEditableItems;
  } catch (err) {
    res.status(400).send("Invalid Edit Fields");
  }
};
module.exports = { validatingSignUpUser, validatingEditProfile };
