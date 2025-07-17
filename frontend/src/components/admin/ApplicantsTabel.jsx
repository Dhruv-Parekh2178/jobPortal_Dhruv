import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTabel = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="min-w-full bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Full Name</th>
              <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Email</th>
              <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Contact</th>
              <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Resume</th>
              <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Date</th>
              <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants &&
              applicants?.applications?.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item.applicant.fullname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item.applicant.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item.applicant.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item?.applicant?.profile?.resume ? (
                      <a
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Download Resume
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item.applicant.createdAt.split("T")[0]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    <div className="flex justify-center">
                      <Popover className="relative">
                        <PopoverButton className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                          <MoreHorizontal size={20} />
                        </PopoverButton>
                        <PopoverPanel className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md p-2 z-10">
                          {shortListingStatus.map((status, index) => (
                            <div
                              key={index}
                              onClick={() => statusHandler(status, item._id)}
                              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                            >
                              <span>{status}</span>
                            </div>
                          ))}
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsTabel;
