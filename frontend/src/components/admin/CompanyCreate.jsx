import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setSingleCompany } from '../../redux/companySlice'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'

const CompanyCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState("")

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        navigate(`/admin/companies/${res.data.company._id}`)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to register company")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">Your Company</h1>
        <p className="text-gray-600 mb-6">
          What would you like to name your company? You can change this later.
        </p>

        <label htmlFor="companyName" className="block font-medium mb-1">
          Company Name
        </label>
        <input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          placeholder="e.g., JobHunt, MicroSoft"
          className="w-full border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="flex flex-wrap items-center gap-4 mt-10">
          <button
            onClick={() => navigate('/admin/companies')}
            className="bg-white text-black font-semibold px-6 py-2 border-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={registerNewCompany}
            className="bg-black text-white font-semibold px-6 py-2 border-2 border-black rounded-lg hover:bg-gray-800 transition"
            disabled={!companyName.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
