
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  return (
    <div className="w-full px-4 py-6">
      {allAppliedJobs.length <= 0 ? (
        <p className="text-center text-gray-600">You haven't applied for any job yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md overflow-hidden hidden md:table">
            {/* Desktop Table Header */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border-b border-gray-300 px-6 py-3 text-left">Date</th>
                <th className="border-b border-gray-300 px-6 py-3 text-left">Job Role</th>
                <th className="border-b border-gray-300 px-6 py-3 text-left">Company</th>
                <th className="border-b border-gray-300 px-6 py-3 text-left">Status</th>
              </tr>
            </thead>

            {/* Desktop Table Body */}
            <tbody>
              {allAppliedJobs.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{item.createdAt.split('T')[0]}</td>
                  <td className="px-6 py-3">{item.job?.title}</td>
                  <td className="px-6 py-3">{item.job?.company.name}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`font-semibold ${
                        item?.status === 'rejected'
                          ? 'text-red-500'
                          : item.status === 'pending'
                          ? 'text-gray-500'
                          : 'text-green-500'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {allAppliedJobs.map((item) => (
              <div key={item._id} className="bg-white border rounded-lg shadow p-4">
                <div className="mb-2">
                  <span className="text-gray-500 text-sm">Date:</span>
                  <div className="text-gray-800 font-medium">{item.createdAt.split('T')[0]}</div>
                </div>
                <div className="mb-2">
                  <span className="text-gray-500 text-sm">Job Role:</span>
                  <div className="text-gray-800 font-medium">{item.job?.title}</div>
                </div>
                <div className="mb-2">
                  <span className="text-gray-500 text-sm">Company:</span>
                  <div className="text-gray-800 font-medium">{item.job?.company.name}</div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Status:</span>
                  <div
                    className={`font-semibold ${
                      item?.status === 'rejected'
                        ? 'text-red-500'
                        : item.status === 'pending'
                        ? 'text-gray-500'
                        : 'text-green-500'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AppliedJobTable
