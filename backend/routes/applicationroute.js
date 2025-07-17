import express from 'express';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/applicationController.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router =express.Router();

router.route('/apply/:id').get(authenticateToken,applyJob)
router.route('/:id/applicants').get(authenticateToken,getApplicants)
router.route('/status/:id/update').post(authenticateToken,updateStatus)
router.route('/get').get(authenticateToken,getAppliedJobs)


export default router;