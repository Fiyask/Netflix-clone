
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../utils/generateToken.js';


export async function signup(req,res){
    

    try{
        const {email,password,username} = req.body;
        

        if(!email || !password || !username){
            return res.status(400).json({sucess:false,message:"All fields are required"})
        }

        const emailRegex = /^[^\s@]+2[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email"})
        }

        if (password.length < 6){
            return res.status(400).json({sucess:false, message:"Password must be at least 6 characters"})
        }

        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"Email already exists"})
        }

        const existingUserByUsername = await User.findOne({username:username})

        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"Username already exists"})
        }
     
         const hashedPassword= bcryptjs.hashSync (req.body.password,6)
        

        const PROFILE_PICS =["/avatar1", "/avatar2", "/avatar3"]

        const image = PROFILE_PICS[Math.floor(Math.random()* PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

          generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                sucess: true,
                 user: {
                    ...newUser._doc,
                    password:""
                 } 
              });        
      
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({success:false,message:"Internal server error"})

    }
}

export async function login(req, res){
    res.send("Login route")
}

export async function logout(req, res){
    res.send("Logout route")

}