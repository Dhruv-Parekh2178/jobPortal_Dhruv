import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setSingleJob } from '../redux/jobSlice'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'
const JobDescription = () => {
    
    // const isApplied=true

    const params=useParams()
    const dispatch=useDispatch()

    const jobId=params.id;
    const{singleJob}=useSelector(store=>store.job)
    const {user}=useSelector(store=>store.auth)

    const isInitiallyApplied=singleJob?.applications?.some(application=>application.applicant===user?._id) || false

    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const applyJobHandler=async()=>{
        try{
            const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {
                    withCredentials:true
                }
            )
            console.log(res.data)
            if(res.data.success)
            {
                setIsApplied(true)
                const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)

            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        const fetchSingleJobs=async()=>{
          try{
              const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{
                  withCredentials:true
              })
              console.log(res.data)
              if(res.data.success)
              {
                  dispatch(setSingleJob(res.data.job))
                  setIsApplied(res.data.applications.some(application=>application.applicant===user?._id))
                // setIsApplied(
                //     Array.isArray(res.data.applications) &&
                //     res.data.applications.some(application => application.applicant === user?._id)
                //   );
              }
          }
          catch(error){
            console.log(error);
          }
        }
        fetchSingleJobs()
      }, [jobId,dispatch,user?._id])
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-3'>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex gap-2'>
                    <button className='text-primary bg-pink-50 rounded-md px-2 py-1 '>{singleJob?.position} Positions</button>
                    <button className='text-red-500 bg-pink-50 rounded-md px-2 py-1 '>{singleJob?.jobType}</button>
                    <button className='text-[#7209b7] bg-pink-50 rounded-md px-2 py-1 '>{singleJob?.salary}LPA</button>
                </div>
            </div>
            <button onClick={isApplied ? null:applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-700 cursor-not-allowed font-semibold text-white': 'bg-primary text-white font-semibold'} px-3 py-2`}>{isApplied ? 'Already Applied':'Apply Now'}</button>
        </div>
        <h1 className='border-b-2 border-b-gray-300  py-4 text-gray-700 font-semibold'>Job Description</h1>
        <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-3 font-normal text-gray-600'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-3 font-normal text-gray-600'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-3 font-normal text-gray-600'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-3 font-normal text-gray-600'>{singleJob?.experience}Yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-3 font-normal text-gray-600'>{singleJob?.salary}LPA</span></h1>
            <h1 className='font-bold my-1'>Total Application: <span className='pl-3 font-normal text-gray-600'>{singleJob?.applications?.length}</span></h1>
            <h1 className='font-bold my-1'>Posted Date: <span className='pl-3 font-normal text-gray-600'>{singleJob?.createdAt.split("T")[0]}</span></h1>

        </div>

    </div>
  )
}

export default JobDescription