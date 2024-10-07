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
module.exports = { validatingSignUpUser };
