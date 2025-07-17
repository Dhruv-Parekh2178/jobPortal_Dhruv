
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";
import { setUser } from "../../redux/authSlice.js";
import { USER_API_END_POINT } from "../../utils/constant.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between py-5 px-5 md:px-28 relative bg-white z-50 shadow-sm">
      {/* Logo */}
      <h1 className="text-gray-800 text-2xl font-semibold">
        Job<span className="text-red-500">Portal</span>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8 mx-10 text-gray-600">
        {user && user.role === "Recruiter" ? (
          <>
            <Link className="hover:text-primary" to="/admin/companies">Companies</Link>
            <Link className="hover:text-primary" to="/admin/jobs">Jobs</Link>
          </>
        ) : (
          <>
            <Link className="hover:text-primary" to="/">Home</Link>
            <Link className="hover:text-primary" to="/jobs">Jobs</Link>
            <Link className="hover:text-primary" to="/browse">Browse</Link>
          </>
        )}
      </ul>

      {/* Desktop Auth Buttons or Profile */}
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login">
              <button className="bg-black text-white font-semibold rounded-md px-3 py-1">Login</button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-500 text-white font-semibold rounded-md px-3 py-1">SignUp</button>
            </Link>
          </>
        ) : (
          <div className="relative profile-menu">
            <img
              className="rounded-full w-8 cursor-pointer"
              src={assets.profile_pic}
              alt="Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute bg-white rounded-lg shadow-lg mt-2 right-0 w-40">
                <ul className="text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/profile">View Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t md:hidden">
          <ul className="flex flex-col gap-2 p-4 text-gray-600">
            {user && user.role === "Recruiter" ? (
              <>
                <Link to="/admin/companies" className="hover:text-primary">Companies</Link>
                <Link to="/admin/jobs" className="hover:text-primary">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-primary">Home</Link>
                <Link to="/jobs" className="hover:text-primary">Jobs</Link>
                <Link to="/browse" className="hover:text-primary">Browse</Link>
              </>
            )}

            {!user ? (
              <>
                <Link to="/login" className="hover:text-primary">Login</Link>
                <Link to="/signup" className="hover:text-primary">SignUp</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="hover:text-primary">View Profile</Link>
                <button onClick={logoutHandler} className="text-left hover:text-primary">Logout</button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
