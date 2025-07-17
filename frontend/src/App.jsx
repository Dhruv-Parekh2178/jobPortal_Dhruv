import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Applicants from './components/admin/Applicants';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetUp from './components/admin/CompanySetUp';
import Job from './components/admin/Job';
import PostJobs from './components/admin/PostJobs';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Browse from './components/Browse';
import Home from './components/Home';
import JobDescription from './components/JobDescription';
import Jobs from './components/Jobs';
import Profile from './components/Profile';





const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:'/jobs',
    element:<Jobs />
  },
  {
    path:'/browse',
    element:<Browse />
  },
  {
    path:'/profile',
    element:<Profile />
  },
  {
    path:'/description/:id',
    element:<JobDescription />
  },


  //admin

  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetUp /></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><Job /></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJobs /></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants /></ProtectedRoute>
  }

]);

const App = () => {
  return (
    <div>
        <ToastContainer />
        <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
