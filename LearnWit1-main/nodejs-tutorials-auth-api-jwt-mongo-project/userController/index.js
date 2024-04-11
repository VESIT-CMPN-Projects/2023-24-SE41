const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const key = "surya"
module.exports.register = async (req,res,next)=>{
    try {
    const {username,email,password} = req.body
    console.log("hi");
    console.log(username,email,password);
    const isUser = await User.findOne({email})
    console.log(isUser);
    if (isUser) return res.json({msg : "Email Already Exists,",status : true})
    const hashPass = await bcrypt.hash(password,10)
    const user = await User.create({username,email,password: hashPass})
    delete user.password
    const token = jwt.sign({user: user._id},key)
    return res.json({status: true,token})
    } catch (error) {
        next(error)
    }
    
}
module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ msg: "No user found", status: false });
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ msg: "Wrong Password", status: false });
      else {
        const token = jwt.sign({ user: user._id }, key);
        return res.json({ status: true, token });
      }
    } catch (e) {
      next(e);
    }
  };
// module.exports = {
//     // validate req.body - Done
//     // create MongoDB UserModel - Done
//     // do password encrytion - Done
//     // save data to mongodb - 
//     // return response to the cliein
//     registerUser: async (req,res)=>{
//         const userModel = new UserModel(req.body);
//         userModel.password = await bcrypt.hash(req.body.password, 10);
//         try{
//             const response = await userModel.save();
//             response.password = undefined;
//             return res.status(201).json({message:'success', data: response});
//         }catch(err){
//             return res.status(500).json({message: 'error', err});
//         }
//     },

//     // check user using email
//     // compare password 
//     // create jwt token
//     // send response to client
//     loginUser:async (req,res)=>{
//        try{
//         const user = await UserModel.findOne({email: req.body.email});
//         if(!user){
//             return res.status(401)
//                 .json({message: 'Auth failed, Invalid username/password'});
//         }

//         const isPassEqual = await bcrypt.compare(req.body.password, user.password);
//         if(!isPassEqual){
//             return res.status(401)
//                 .json({message: 'Auth failed, Invalid username/password'});
//         }
//         const tokenObject = {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email
//         }
//         const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn: '4h'});
//         return res.status(200)
//             .json({jwtToken, tokenObject});
//        }catch(err){
//             return res.status(500).json({message:'error',err});
//        }
//     },

//     getUsers : async(req,res)=>{
//         try{
//             const users = await UserModel.find({}, {password:0});
//             return res.status(200)
//                 .json({data: users});
//         }catch(err){
//             return res.status(500)
//                 .json({message:'error', err});
//         } 
//     }
// }