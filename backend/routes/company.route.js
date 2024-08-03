import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
//import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route('/register').post(registerCompany);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated, updateProfile);

export default router;
