
const LatestJobCards = ({ job, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='shadow-xl flex flex-col gap-1 rounded-md p-5 transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 cursor-pointer'
    >
      <p className='font-medium text-lg'>{job?.company?.name}</p>
      <p className='text-sm'>{job?.location}</p>
      <p className='font-bold text-lg my-2'>{job?.title}</p>
      <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
      <div className='flex gap-2 flex-wrap'>
        <button className='text-primary bg-pink-50 rounded-md px-2 py-1 mt-2'>{job?.position} Positions</button>
        <button className='text-red-500 bg-pink-50 rounded-md px-2 py-1 mt-2'>{job?.jobType}</button>
        <button className='text-[#7209b7] bg-pink-50 rounded-md px-2 py-1 mt-2'>{job?.salary} LPA</button>
      </div>
    </div>
  );
};

export default LatestJobCards;
