import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const category=[
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Graphic Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Graphic Designer",
]
const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query))
      navigate('/browse')
    }
  return (
    <div className='flex items-center justify-center mt-14'>
            <div  className='flex gap-3  w-[40%] overflow-scroll shrink-0'>
                {category.map((cat, index) => (
                    <div key={index} className=' flex-shrink-0'>
                        <button onClick={()=>searchJobHandler(cat)} className='bg-white text-gray-700 px-4 py-2 font-semibold rounded-full border-2'>{cat}</button>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default CategoryCarousel