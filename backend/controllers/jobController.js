import { Job } from "../models/jobModel.js"

//Admon job post
export const postJob=async(req,res)=>{
    try{
        const {title,description,requirements,location,salary,jobType,position,experience,companyId}=req.body
        const userId=req.id
     

        if(!title ||!description ||!requirements ||!location ||!salary ||!jobType ||!position ||!experience ||!companyId)
        {
            return res.status(400).json({success:false,message:'All fields are required'})
        }

        const job=await Job.create({
            title,
            description,
            requirements:requirements.split(','),
            location,
            salary:Number(salary),
            jobType,
            position,
            experience,
            company:companyId,
            created_by:userId
        })
        res.status(200).json({success:true,message:"Job created successfully",job})

    } 
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}


//get all jobs for users


export const getAllJobs=async(req,res)=>{
    try{
        const keyword=req.query.keyword || ""
        console.log(keyword)
        let query={
            
        }

        if(keyword)
        {
         query=
        {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
                {requirements:{$in:keyword.split(',').map(req=>req.trim())}},
                {location:{$regex:keyword,$options:"i"}},
                {position:{$regex:keyword,$options:"i"}},
                {company:{$regex:keyword,$options:"i"}},
                {jobType:{$regex:keyword,$options:"i"}},
                {experience:{$regex:keyword,$options:"i"}},
                {salary:{$regex:keyword,$options:"i"}},
                {created_by:{$regex:keyword,$options:"i"}}
            ]
        }
    }
    else
    {
        query={}
    }

        const jobs=await Job.find(query).populate({
            path:'company',
        }).sort({createdAt:-1})

        if(!jobs)
        {
            return res.status(404).json({success:false,message:'No jobs found'})
        }
        res.json({success:true,jobs})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//job by id

export const getJobById=async(req,res)=>{
    try{
        const jobId=req.params.id

        const job=await Job.findById(jobId).populate({
            path:'applications',
        })

        if(!job)
        {
            return res.status(404).json({success:false,message:'Job not found'})
        }
        res.json({success:true,job})

    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//Job created by admin 

export const getAdminJobs=async(req,res)=>{
    try{
        const adminId=req.id
        const jobs=await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        })

        if(!jobs)
        {
            return res.status(404).json({success:false,message:'No jobs found'})
        }
        res.json({success:true,jobs})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}