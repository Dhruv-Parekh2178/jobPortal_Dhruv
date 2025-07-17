import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useGetCompanyById from '../../hooks/useGetCompanyById'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'

const CompanySetUp = () => {
  const params = useParams()
  const navigate = useNavigate()
  useGetCompanyById(params.id)

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  })

  const { singleCompany } = useSelector((store) => store.company)

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        file: null, // File should not auto-fill
      })
    }
  }, [singleCompany])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }
    } catch (error) {
      console.error(error)
      toast.error('Update failed')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <form onSubmit={submitHandler}>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => navigate('/admin/companies')}
              className="flex items-center gap-2 text-gray-800 font-semibold bg-gray-100 rounded-lg border px-4 py-2 hover:bg-gray-200"
            >
              <i className="fa-solid fa-backward"></i>
              <span>Back</span>
            </button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Company Name
              </label>
              <input
                id="name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                type="text"
                className="w-full border-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <input
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                type="text"
                className="w-full border-2 px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="website" className="block font-medium mb-1">
                Website
              </label>
              <input
                id="website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                type="text"
                className="w-full border-2 px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="location" className="block font-medium mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                type="text"
                className="w-full border-2 px-4 py-2 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="file" className="block font-medium mb-1">
                Company Logo
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full border-2 px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full mt-8 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default CompanySetUp
