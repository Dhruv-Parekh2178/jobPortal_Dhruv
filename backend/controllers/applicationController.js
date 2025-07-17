import { Application } from "../models/applicationModel.js"
import { Job } from "../models/jobModel.js"

export const applyJob=async(req,res)=>{
    try{
        const userId=req.id
        const jobId=req.params.id

        if(!jobId)
        {
            return res.status(400).json({success:false,message:'Invalid job ID'})
        }

        //check if user already exists
        const existingApplication=await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({success:false,message:'You have already applied for this job'})
        }

        //check job already exists
        const job=await Job.findById(jobId)
        if(!job){
            return res.status(404).json({success:false,message:'Job not found'})
        }

        //create new application
        const newApplication =await  Application.create({
            job:jobId,
            applicant:userId
        })
        job.applications.push(newApplication._id)
        await job.save()
        res.json({success:true,message:"Application submitted"})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

export const getAppliedJobs=async(req,res)=>{
    try{
        const userId=req.id
        const applications=await Application.find({applicant:userId}).sort({createdAt:-1}).populate(
            {
                path:'job',
                options:{sort:{createdAt:-1}},
                populate:{
                    path:'company',
                },options:{sort:{createdAt:-1}}
            }
        )
        if(!applications)
        {
            return res.status(404).json({success:false,message:'No applications found'})
        }

        res.json({success:true,applications})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }

}


//get applicants

export const getApplicants=async(req,res)=>{
    try{
        const jobId=req.params.id

        const job=await Job.findById(jobId).populate(
            {
                path:'applications',
                options:{sort:{createdAt:-1}},
                populate:{
                    path:'applicant',
                },options:{sort:{createdAt:-1}}
            }
        )

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

//update status

export const updateStatus=async (req,res)=>{
    try{
        const {status}=req.body
        const applicationId=req.params.id

        if(!status)
        {
            return res.status(400).json({success:false,message:'Invalid status'})
        }

        const application=await Application.findById(applicationId)
        if(!application)
        {
            return res.status(404).json({success:false,message:'Application not found'})
        }

        //update status

        application.status=status.toLowerCase()
        await application.save()
        res.json({success:true,message:"Application status updated"})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}