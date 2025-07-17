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
