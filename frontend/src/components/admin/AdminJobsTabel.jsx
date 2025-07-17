
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Edit, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTabel = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="p-4 md:p-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 shadow-md text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 md:p-3 border whitespace-nowrap">Company Name</th>
            <th className="p-2 md:p-3 border whitespace-nowrap">Role</th>
            <th className="p-2 md:p-3 border whitespace-nowrap">Date</th>
            <th className="p-2 md:p-3 border whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs.map((job) => (
            <tr key={job._id} className="text-center">
              <td className="p-2 md:p-3 border whitespace-nowrap">{job?.company?.name}</td>
              <td className="p-2 md:p-3 border whitespace-nowrap">{job?.title}</td>
              <td className="p-2 md:p-3 border whitespace-nowrap">{job.createdAt.split("T")[0]}</td>
              <td className="p-2 md:p-3 border whitespace-nowrap">
                <div className="flex justify-center">
                  <Popover className="relative">
                    <PopoverButton className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                      <MoreHorizontal size={20} />
                    </PopoverButton>
                    <PopoverPanel className="absolute right-0 md:left-auto mt-2 w-32 bg-white border shadow-md rounded-md p-2 z-10">
                      <button
                        className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded"
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 w-full"
                      >
                        <i className="fa-solid fa-user"></i>
                        <span>Applicants</span>
                      </div>
                    </PopoverPanel>
                  </Popover>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTabel;

