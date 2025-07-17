import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../models/userModel.js"
import cloudinary from '../utils/cloudinary.js'
import getDataUri from '../utils/datauri.js'
export const register=async(req,res)=>{
    try{
        const {fullname,email,password,phoneNumber,role} = req.body
        // console.log(fullname)
        if(!fullname || !email || !password || !phoneNumber || !role)
        {
            return res.status(400).json({
                success: false,
                message: 'All fields are required ok'
            })
        }

        const file=req.file
        const fileUri=getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const user =await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }


        //convert password to hash
        const hasedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            fullname,
            email,
            password:hasedPassword,
            phoneNumber,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })

        await newUser.save()
        return res.status(200).json({success: true, message:`Account Created Succesfully ${fullname}`})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//login

export const login=async(req,res)=>{
    try{
        const {email,password,role} = req.body


        if(!email || !password || !role){
            return res.status(400).json({
                success: false,
                message: 'Missing fields required'
            })
        }

        //find user with email
        let user=await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            })
        }

        if(role!==user.role)
        {
            console.log(role)
            console.log(user.role)
            return res.status(403).json({
                success: false,
                message: 'You dont have neccasary role to access this resources'
            })
        }


        //generate token
        const tokenData={
            userId: user._id,
        }

        const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'})

        console.log(token)
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }


        // return res.status(200).cookie("token",token,
        // {
        // maxAge:1*24*60*60*1000,
        // httpsOnly:true,
        // sameSite:"strict"
        // }).json({
        //     success:true,
        //     user,
        //     message:`Welcome Back ${user.fullname}`
        // })
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true on Render
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax" // allow frontend-backend on different domains
          }).json({
            success: true,
            user,
            message: `Welcome Back ${user.fullname}`
          });
          
        
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
        console.log(error)
    }
}

//logout function

export const logout = async (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"LogOut successfully"
        })
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}


//update profile

export const updateProfile=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body
        console.log(fullname,email,phoneNumber,bio,skills)

            //cloudinary upload

            const file=req.file;
            const fileUri=getDataUri(file)
            const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
            



            let skillsArray;
            if(skills)
            {
              skillsArray=skills.split(',')
            }

            const userId=req.id //middleware

            let user=await User.findById(userId)
            if(!user)
            {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }
            //update database
            if(fullname)
            {
                user.fullname=fullname
            }
            if(email)
            {
                user.email=email
            }
            if(phoneNumber)
            {
                 user.phoneNumber=phoneNumber
            }
            
            if(bio)
            {
                user.profile.bio=bio
            }
            if(skills)
            {
                user.profile.skills=skillsArray
            }
            //resume

            if(cloudResponse)
            {
                user.profile.resume=cloudResponse.secure_url  //save the cloudinary url
                user.profile.resumeOriginalName=file.originalname
            }
            await user.save()

            user={
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
                phoneNumber:user.phoneNumber,
                role:user.role,
                profile:user.profile

            }
            return res.status(200).json({
                success: true,
                user,
                message:"Profile Updated Successfully"
            })
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}