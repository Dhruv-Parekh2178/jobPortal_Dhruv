// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute=({children})=>{

//     const {user}=useSelector(store=>store.auth);
//     const navigate=useNavigate()

//     useEffect(() => {
//       if(user===null||user.role!=="recruiter")
//       {
//         navigate('/')
//       }
//     }, [])
//     return (
//         <div>
//             {children}
//         </div>
//     );
    
// }

// export default ProtectedRoute;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until user is defined (not null or undefined)
    if (user !== undefined) {
      if (user === null || user.role !== "Recruiter") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  // Optional: show nothing or a loader until user is available
  if (user === undefined) {
    return null; // Or <div>Loading...</div>
  }

  return <>{children}</>;
};

export default ProtectedRoute;
