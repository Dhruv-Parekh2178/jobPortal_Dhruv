
import { Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets.js";
import useGetAppliedJobs from "../hooks/useGetAppliedJob.jsx";
import AppliedJobTable from "./AppliedJobTable.jsx";
import Navbar from "./shared/Navbar.jsx";
import UpdateProfileDialoag from "./UpdateProfileDialoag.jsx";

const isResume = true;

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const {user}=useSelector(store=>store.auth)

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-[60%] border-2 rounded-lg shadow-md mt-8 p-7 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex gap-7 mb-4 items-center">
                            <img src={assets.logo} alt="Profile" />
                            <div>
                                <p className="text-gray-800 font-semibold text-2xl">{user?.fullname}</p>
                                <p className="text-gray-600">{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <button className="border-2 rounded-md h-full p-2" onClick={() => setOpen(true)}>
                            <Pen />
                        </button>
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <i className="fa-regular fa-envelope"></i>
                            <p className="text-primary">{user?.email}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <i className="fa-solid fa-phone"></i>
                            <p className="text-gray-600">{user?.phoneNumber}</p>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-gray-800 font-semibold text-xl mb-1">Skills</h1>
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <button
                                    className="bg-black text-white font-semibold rounded-full px-4 py-1 mr-2"
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold text-xl mt-1">Resume</p>
                        {isResume ? (
                            <a
                                className="text-primary hover:underline"
                                href={user?.profile?.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>
                <div className="w-[60%]">
                    <div className="flex flex-col items-start">
                        <h1 className="font-semibold text-gray-800 text-2xl p-5 mt-2">Applied Jobs</h1>
                        <AppliedJobTable />
                    </div>
                </div>
            </div>
            {/* Update Profile Dialog */}
            <UpdateProfileDialoag open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
