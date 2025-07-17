import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setLoading, setUser } from '../../redux/authSlice'
import { USER_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <Navbar />
      <form onSubmit={submitHandler} className='flex justify-center items-center mt-10 px-4'>
        <div className='flex flex-col gap-4 w-full max-w-md p-6 border-2 rounded-md shadow-md bg-white'>
          <p className='text-black font-semibold text-2xl text-center'>Login</p>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              className='w-full px-3 py-2 mt-1 border-2 rounded-md outline-none focus:ring focus:ring-blue-300'
              type="email"
              placeholder='Enter Email'
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              className='w-full px-3 py-2 mt-1 border-2 rounded-md outline-none focus:ring focus:ring-blue-300'
              type="password"
              placeholder='Enter Password'
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className='mt-3'>
            <p className='text-sm font-medium mb-1'>Role</p>
            <div className='flex items-center gap-4'>
              <label className='flex items-center gap-1'>
                <input
                  type='radio'
                  name='role'
                  value='Student'
                  className='cursor-pointer'
                  checked={input.role === 'Student'}
                  onChange={changeEventHandler}
                />
                <span>Student</span>
              </label>
              <label className='flex items-center gap-1'>
                <input
                  type='radio'
                  name='role'
                  value='Recruiter'
                  className='cursor-pointer'
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          <button
            type='submit'
            className='bg-black text-white font-semibold w-full rounded-md px-4 py-2 mt-4 hover:bg-gray-900 transition'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className='text-center text-gray-700 mt-2 text-sm'>
            Don’t have an account?{' '}
            <Link className='text-blue-500 hover:underline' to='/signup'>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
