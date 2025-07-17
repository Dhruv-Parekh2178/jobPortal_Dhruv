// import axios from "axios";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { JOB_API_END_POINT } from "../../utils/constant";
// import Navbar from "../shared/Navbar";

// const companyArray=[];
// const PostJobs = () => {

//   const navigate=useNavigate();

//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     position: 0,
//     companyId: "",
//   });

//   const {companies}=useSelector(store=>store.company)

//   const changeEventHandler = async (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const selectChangeHandler=async (e)=>{
//     setInput({ ...input, companyId: e.target.value });
//     // const selectedCompany=companies.find((company)=>company.name.toLowerCase()==value);
//     // setInput({...input, companyId: selectedCompany._id });
//   }

//   const submitHandler=async(e)=>{
//     e.preventDefault();
//     // console.log(input)
//     // console.log(companies)

//     try{
//       const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
//         headers:{
//           "Content-Type":"application/json"
//         },
//         withCredentials:true,
//       })
//       if(res.data.success)
//       {
//         toast.success(res.data.message);
//         navigate("/admin/jobs")
//       }
//     }
//     catch(error){
//       toast.error(error.response.data.message)
//       console.log(error)
//     }
//   }
//   return (
//     <div>
//       <Navbar />

//       <div className="flex items-center justify-center w-screen my-5">
//         <form onSubmit={submitHandler} action="" className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md">
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label htmlFor="">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={input.title}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={input.description}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="">Requirements</label>
//             <input
//               type="text"
//               name="requirements"
//               value={input.requirements}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="">Salary</label>
//             <input
//               type="text"
//               name="salary"
//               value={input.salary}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={input.location}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor=""> JobType</label>
//             <input
//               type="text"
//               name="jobType"
//               value={input.jobType}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="">Experience</label>
//             <input
//               type="text"
//               name="experience"
//               value={input.experience}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="">NO of Position</label>
//             <input
//               type="number"
//               name="position"
//               value={input.position}
//               onChange={changeEventHandler}
//               className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
//             />
//           </div>
//           {
//               companies.length>=0 &&
//               (
//                 <select onChange={selectChangeHandler} name="companyId" id="companyId"   className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md">
//                    <option value="" disabled selected hidden>Select Company</option>
//                    {
//                     companies.map((company)=>{
//                        return (
//                          <option value={company._id} key={company._id}>{company.name}</option>
//                        )
//                     })
//                    }
//                 </select>
//               )
//           }
//         </div>
//         <button className="w-full bg-black text-white font-md px-3 py-2 mt-4 rounded-full text-xl">Post New Job</button>
//         {
//           companies.length === 0 && <p className="text-sm text-red-600 font-bold text-center my-3">*Please register company first,before posting a jobs</p>
//         }
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJobs;


import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_API_END_POINT } from "../../utils/constant";
import Navbar from "../shared/Navbar";

const PostJobs = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    setInput({ ...input, companyId: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company first");
      return;
    }

    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full px-4 my-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-md border"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Post New Job</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "title", label: "Job Title" },
              { name: "description", label: "Job Description" },
              { name: "requirements", label: "Requirements" },
              { name: "salary", label: "Salary" },
              { name: "location", label: "Location" },
              { name: "jobType", label: "Job Type" },
              { name: "experience", label: "Experience" },
              { name: "position", label: "Number of Positions", type: "number" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="w-full border-2 px-4 py-2 rounded-md"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block font-medium mb-1">Select Company</label>
              <select
                name="companyId"
                value={input.companyId}
                onChange={selectChangeHandler}
                className="w-full border-2 px-4 py-2 rounded-md"
                required
              >
                <option value="" disabled>
                  -- Choose Company --
                </option>
                {companies.map((company) => (
                  <option value={company._id} key={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold px-4 py-2 mt-6 rounded-full text-lg hover:bg-gray-800"
          >
            Post New Job
          </button>

          {companies.length === 0 && (
            <p className="text-center text-red-600 font-medium mt-4">
              * Please register a company first before posting jobs.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
