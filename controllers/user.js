const User = require("../models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");
const validator = require("validator");
const SALT_ROUND = parseInt(process.env.SALT_ROUND);
//Register user
const registerUser = async (req, resp) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return resp.status(400).send({ error: "All fields are required" });
  }
  if (!validator.isAlpha(name)) {
    return resp
      .status(400)
      .send({ error: "Name must contain only alphabetic characters" });
  }
  if (!validator.isEmail(email)) {
    return resp.status(400).send({ error: "Invalid email address" });
  }
  if (!validator.isAlphanumeric(username)) {
    return resp.status(400).send({ error: "Username must be alphanumeric" });
  }
  if (validator.isEmpty(username)) {
    return resp.status(400).send({ error: "Username cannot be empty" });
  }
  if (!validator.isLength(password, { min: 8 })) {
    return resp
      .status(400)
      .send({ error: "Password must be at least 8 characters long" });
  }

  //Chccek User Name or Email Already Exits
  const exitEmail = await User.findOne({ email: email });
  if (exitEmail) {
    return resp.status(400).send({ Error: "Email Already Exits" });
  }
  const lowerCaseUsername = username.toLowerCase();

  const exitUsername = await User.findOne({ username: lowerCaseUsername });
  if (exitUsername) {
    return resp.status(400).send({ Error: "Username Already Taken" });
  }

  const hashPassword = await bcrypt.hash(password, SALT_ROUND);

  const newUser = new User({
    name,
    email,
    username,
    password: hashPassword,
  });

  try {
    const saveUser = await newUser.save();
    resp
      .status(201)
      .send({ status: 201, message: "User Register Successfully" });
  } catch (error) {
    resp
      .status(500)
      .send({ error: "An error occurred while registering the user" });
  }
};

//Login For User 
const loginUser = async(req,resp)=>{
  const {loginId,password} = req.body;
  //Chceking both are not empty 
  if(!loginId || !password){
    return resp.status(500).send({Error:"All fields are required"})
  }
  let userData;
  //Checking if email then find in collection and store in userData
  if(validator.isEmail(loginId)){
   userData = await User.findOne({email:loginId})
  }else{
    //find by username and store in userData
    userData = await User.findOne({username:loginId})
  }

  // if User not Found return
 if(!userData){
  return resp.status(500).send({Error:"User Not Found"})
 }
 //checking password and user Password matched or not
 const isMatch = await bcrypt.compare(password,userData.password)

 //if not matched return
 if(!isMatch){
  return resp.status(500).send({Error:"Wrong Password"})
 }
 // adding fields in session
 req.session.isAuth = true;
 req.session.user = {
  name:userData.name,
  username:userData.username,
  email:userData.email,
  userId:userData._id
 }
 resp.status(201).send({message:"Login success"})

}

//User Logout 
const logoutUser = (req,resp)=>{
  req.session.destroy((err)=>{
    if(err){
      return resp.status(400).send({status:400,message:"logout failed",error:err})
    }
  })
  return resp.status(201).send({status:200,message:"logout successfully"})
}

module.exports = { registerUser,loginUser,logoutUser };
