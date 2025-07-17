
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '../../redux/companySlice'
import Navbar from '../shared/Navbar'
import CompaniesTabel from './CompaniesTabel'

const Companies = () => {
  useGetAllCompanies()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between mb-6">
          <input
            type="text"
            className="w-full sm:w-fit border-2 rounded-lg px-4 py-2"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            New Company
          </button>
        </div>

        <div className="overflow-x-auto">
          <CompaniesTabel />
        </div>
      </div>
    </div>
  )
}

export default Companies
