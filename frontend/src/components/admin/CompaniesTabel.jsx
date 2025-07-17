// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
// import { Edit, MoreHorizontal } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const CompaniesTabel = () => {
//   const { companies ,searchCompanyByText} = useSelector((store) => store.company);

//   const navigate=useNavigate()
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const [filterCompany, setFilterCompany] = useState(companies)

//   useEffect(() => {
   
//     const filteredCompany=companies.length > 0 && companies.filter((company)=>{
//       if(!searchCompanyByText){
//         return true
//       }
//       return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
//     })

//     setFilterCompany(filteredCompany)
      
//   }, [companies,searchCompanyByText])
  

//   return (
//     <div>
//       <div className="p-6">
//         <table className="w-full border-collapse border border-gray-200 shadow-md">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 border">Logo</th>
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Date</th>
//               <th className="p-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.length <= 0 ? (
//               <span>You have'nt Registered any company yet.</span>
//             ) :
//             (
//               <>
//                 {filterCompany.map((company) => (
//                   <tr key={company.id} className="text-center">
//                     <td className="p-3 border">
//                       <img
//                         src={company.logo}
//                         alt="Logo"
//                         className="w-10  h-10 mx-auto rounded-full"
//                       />
//                     </td>
//                     <td className="p-3 border">{company.name}</td>
//                     <td className="p-3 border">{company.createdAt.split("T")[0]}</td>
//                     <td className="p-3 border relative">
//                       <Popover className="relative">
//                         <PopoverButton className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
//                           <MoreHorizontal size={20} />
//                         </PopoverButton>
//                         <PopoverPanel className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md p-2 z-10">
//                           <button
//                             className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded"
//                             onClick={() => navigate(`/admin/companies/${company._id}`)}
//                           >
//                             <Edit size={16} />
//                             Edit
//                           </button>
//                         </PopoverPanel>
//                       </Popover>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}
//           </tbody>
//         </table>

//         {/* {editData && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h2 className="text-lg font-semibold">Edit {editData.name}</h2>
//               <button
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//                 onClick={() => setEditData(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default CompaniesTabel;




import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Edit, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTabel = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full p-4">
        <table className="min-w-full border-collapse border border-gray-200 shadow-md text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 md:p-3 border whitespace-nowrap">Logo</th>
              <th className="p-2 md:p-3 border whitespace-nowrap">Name</th>
              <th className="p-2 md:p-3 border whitespace-nowrap">Date</th>
              <th className="p-2 md:p-3 border whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.length <= 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  You haven't registered any company yet.
                </td>
              </tr>
            ) : (
              filterCompany.map((company) => (
                <tr key={company._id} className="text-center">
                  <td className="p-2 md:p-3 border">
                    <img
                      src={company.logo}
                      alt="Logo"
                      className="w-10 h-10 mx-auto rounded-full object-cover"
                    />
                  </td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">{company.name}</td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">
                    {company.createdAt.split("T")[0]}
                  </td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">
                    <Popover className="relative">
                      <PopoverButton className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                        <MoreHorizontal size={20} />
                      </PopoverButton>
                      <PopoverPanel className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md p-2 z-10">
                        <button
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded"
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                      </PopoverPanel>
                    </Popover>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesTabel;
