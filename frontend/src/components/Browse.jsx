
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // 🔑
import useGetAllJobs from '../hooks/useGetAllJobs';
import { setSearchedQuery } from '../redux/jobSlice';
import FilterCard from './FilterCard'; // 🔑
import Job from './Job';
import Navbar from './shared/Navbar';

const Browse = () => {
  const location = useLocation(); // ✅ get current route
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <h1 className="font-bold text-2xl">
          Search Results <span className="text-primary">({allJobs.length})</span>
        </h1>

        {/* ✅ Only show FilterCard if on `/job` route */}
        {location.pathname === '/job' && (
          <div className="mt-4 mb-8">
            <FilterCard />
          </div>
        )}

        {/* ✅ Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
