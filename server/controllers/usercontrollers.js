const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Token creator function
const createToken = (_id) => jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); 

//signup controller
const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.signUpUser(email, password, username ); 
    //create token after user has been saved into the db
    const token = createToken(user._id)
    res.status(200).json({ email, token, username }); 
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try{
    const user = await User.logInUser(email, password)
    //const userFoundByEmail= await User.find({ email })
    //console.log(userFoundByEmail)
     const token = createToken(user._id)
    res.status(200).json({email, token, username: user.username })
  } catch(error){
    res.status(400).json({ error: error.message})
    console.log({error})
  }
};

module.exports = { signup, login };
