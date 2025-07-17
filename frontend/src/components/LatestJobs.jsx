
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
  const navigate = useNavigate();
  const { allJobs } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth); // Get user from Redux

 const handleJobClick = (jobId) => {
  if (!user) {
    navigate('/login'); // Redirect if not logged in
  } else {
    navigate(`/description/${jobId}`); // Navigate to job description page
  }
};


  return (
    <div className='mx-auto my-20 max-w-7xl'>
      <h1 className='font-bold text-4xl text-purple-700'>
        Latest & Top<span className='text-black'> Job Openings</span>
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
        {
          allJobs.length <= 0
            ? <span className='text-gray-700'>No Jobs Available</span>
            : allJobs.slice(0, 6).map((job) => (
              <LatestJobCards
                key={job._id}
                job={job}
                onClick={() => handleJobClick(job._id)}
              />
            ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;
