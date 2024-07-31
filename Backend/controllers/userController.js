import { response } from 'express';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

export const signup = async (req,res)=>{
    
    try{
        const {email,password}=req.body;
        const user= await User.findOne({ email });
        if (user){
            return res.status(400).json({msg:'User already exists'})
        }
        const hashPassword = await bcryptjs.hash(password,10)
        const CreatedUser=new User({
            email: email,
            password:hashPassword,
    })
  
    await CreatedUser.save()
res.status(200).json({msg:'User created successfully'})
} catch(error) {
console.log("Error :" + error.message)
res.status(500).json({msg:"Internal Server Error"})
}
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password)
    if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env["JWT_TOKEN"], { expiresIn: "10d" })
        console.log("user",user._id,token)
        res.json({
          token: token
        })      
       }
    }catch(err) {
        console.log("Error :" + err.msg)
        res.status(500).json({msg:"Internal Server Error"})
    }
}

export const logout = async (req, res, next) => {
console.log("logout", req.body)
try {
    const { } = req.body;
    const user = await User.findOne({});
   console.log("user", user)

}catch(err) {
    console.log("Error :" + err.msg)
    res.status(500).json({msg:"Internal Server Error"})
}
     ;
}


