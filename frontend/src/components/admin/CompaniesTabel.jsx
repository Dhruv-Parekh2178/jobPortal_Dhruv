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
