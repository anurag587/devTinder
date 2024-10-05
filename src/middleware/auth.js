const adminAuth = (req,res,next) => {
  const token = "xyzdsds";
  const isAdminAuth = token === "xyz";
  if (!isAdminAuth) {
    res.status(404).send("Admin not Found");
  }
  else{
    next();
  }
};

module.exports = {adminAuth}