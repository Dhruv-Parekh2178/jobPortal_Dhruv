import express from 'express';
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from '../controllers/companyController.js';
import authenticateToken from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router =express.Router();

router.route('/register').post(authenticateToken,registerCompany)
router.route('/update/:id').put(authenticateToken,singleUpload,updateCompany)
router.route('/get/:id').get(authenticateToken,getCompanyById)
router.route('/get').get(authenticateToken,getAllCompanies)


export default router;