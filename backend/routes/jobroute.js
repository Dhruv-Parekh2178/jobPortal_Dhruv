import express from 'express';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobController.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router =express.Router();

router.route('/post').post(authenticateToken,postJob)
router.route('/get/:id').get(authenticateToken,getJobById)
router.route('/getadminjobs').get(authenticateToken,getAdminJobs)
router.route('/get').get(authenticateToken,getAllJobs)


export default router;