// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { setAllApplicants } from '../../redux/applicationSlice';
// import { APPLICATION_API_END_POINT } from '../../utils/constant';
// import Navbar from '../shared/Navbar';
// import ApplicantsTabel from './ApplicantsTabel';



// const Applicants = () => {

//   const params=useParams()
//   const dispatch=useDispatch()
//   const {applicants}=useSelector(store=>store.application)
  
//   useEffect(() => {
//     const fetchAllApplicants=async () => {
//       try{
//         const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,
//           {
//             withCredentials: true
//           }
//         )
//         console.log(res.data)
//         // if(res.data.success)
//         // {
//         //     dispatch(setAllApplicants(res.data.job))
//         // }
//         dispatch(setAllApplicants(res.data.job))
//       }
//       catch(error){
//         console.error('Error fetching applicants', error)
//       }
//     }
//     fetchAllApplicants()
//   }, [])
  
//   return (
//     <div>
//         <Navbar />
//         <div className='max-w-7xl mx-auto'>
//             <h1 className='font-bold text-xl my-5'>Applicants({applicants.applications.length})</h1>
//             <ApplicantsTabel />
//         </div>
//     </div>
//   )
// }

// export default Applicants






import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllApplicants } from '../../redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import Navbar from '../shared/Navbar';
import ApplicantsTabel from './ApplicantsTabel';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error('Error fetching applicants', error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-xl sm:text-2xl my-5 text-center sm:text-left">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <div className="overflow-x-auto">
          <ApplicantsTabel />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
