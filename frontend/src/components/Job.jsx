
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
      <div className="flex flex-col shadow-xl mt-8 border-2 h-auto md:h-[330px] w-full md:w-[380px] rounded-md p-5 gap-2 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
    {/* Top Row */}
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <i className="fa-regular fa-bookmark"></i>
        </div>

        {/* Company Info */}
        <div className="flex gap-3 items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={job?.company?.logo}
            alt=""
          />
          <div className="flex flex-col">
            <p className="text-gray-800 font-semibold">{job?.company?.name}</p>
            <p className="text-sm text-gray-700">India</p>
          </div>
        </div>

        {/* Job Title & Description */}
        <div>
          <p className="text-gray-900 text-xl font-bold">{job?.title}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{job?.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <button className="text-primary bg-pink-50 rounded-md px-2 py-1 mt-2">
            {job?.position} Positions
          </button>
          <button className="text-red-500 bg-pink-50 rounded-md px-2 py-1 mt-2">
            {job?.jobType}
          </button>
          <button className="text-[#7209b7] bg-pink-50 rounded-md px-2 py-1 mt-2">
            {job?.salary} LPA
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            onClick={() => navigate(`/description/${job?._id}`)}
            className="bg-gray-300 text-black px-3 py-2 rounded-md"
          >
            Details
          </button>
          <button className="bg-primary text-white px-3 py-2 rounded-md">
            Save For Later
          </button>
        </div>
      </div>
    
  );
};

export default Job;

