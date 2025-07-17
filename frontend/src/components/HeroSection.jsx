

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className='text-center px-4 py-10'>
      <div className='flex flex-col gap-5 max-w-3xl mx-auto'>
        <h1 className='text-red-500 text-sm sm:text-base font-semibold'>JOB PORTAL WEBSITE</h1>
        
        <p className='text-gray-800 font-bold text-3xl sm:text-5xl leading-tight'>
          Search, Apply & <br /> Get Your <span className='text-purple-700'>Dream Jobs</span>
        </p>
        
        <p className='text-gray-600 text-sm sm:text-base'>
          Find your dream job with ease! Explore top opportunities, connect with recruiters, and kickstart your career today
        </p>

        <div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0'>
          <input 
            onChange={(e) => setQuery(e.target.value)} 
            type="text" 
            placeholder='Find your dream jobs'
            className='w-full sm:w-[60%] bg-white outline-none border-2 rounded-full px-4 py-2 shadow-md'
          />
          <button 
            onClick={searchJobHandler}
            className='bg-primary text-white font-semibold rounded-full px-5 py-2 mt-2 sm:mt-0 sm:ml-2'
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
