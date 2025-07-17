
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'
import Navbar from '../shared/Navbar'
import AdminJobsTabel from './AdminJobsTabel'

const Job = () => {
  useGetAllAdminJobs()

  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            className="w-full sm:w-1/2 border-2 rounded-lg px-4 py-2"
            placeholder="Filter by name or role"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            + New Job
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 overflow-auto">
          <AdminJobsTabel />
        </div>
      </div>
    </div>
  )
}

export default Job
