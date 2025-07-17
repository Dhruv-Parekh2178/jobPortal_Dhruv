import { Company } from "../models/companyModel.js"
import cloudinary from '../utils/cloudinary.js'
import getDataUri from '../utils/datauri.js'


export const registerCompany=async(req,res)=>{
    
    try{
        const {companyName}=req.body
        // console.log(companyName)
        if(!companyName)
        {
            return res.status(400).json({success:false,message:'Company Name is required'})
        }
        // if(!description)
        // {
        //     return res.status(400).json({success:false,message:'Company Description is required'})
        // }

        let company =await Company.findOne({name:companyName})
        if(company)
        {
            return res.status(400).json({success:false,message:'Company already exists'})
        }

            company=await Company.create({
                name:companyName,
                // description,
                userId:req.id
            })

            res.status(201).json({success:true,message:'Company registered successfully',company})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

//get all company

export const getAllCompanies=async (req,res)=>{
    try{
        const userId=req.id // login user ni id 
        const companies=await Company.find({userId})

        if(!companies)
        {
            return res.status(404).json({success:false,message:'No companies found'})
        }
        res.json({success:true,companies})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//get company by id
export const getCompanyById=async (req,res)=>{
    try{
        const companyId=req.params.id
        const company=await Company.findById(companyId)
        if(!company)
        {
            return res.status(404).json({success:false,message:'Company not found'})
        }
        res.json({success:true,company})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//update company

export const updateCompany=async(req,res)=>{
    try{
        const {name,description,website,location}=req.body
        // console.log(name,description,website,location)
        const file=req.file

        //cloudinary
        const fileUri=getDataUri(file)
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
        const logo=cloudResponse.secure_url;


        const updateData={name,description,website,location,logo}

        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})

        if(!company)
        {
            return res.status(404).json({success:false,message:'Company not found'})
        }
        res.json({success:true,message:"Company Updated"})

    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}