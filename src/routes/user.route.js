/* eslint-disable prettier/prettier */
import express from 'express';
import * as UserController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { setAdminRole, setUserRole } from '../utils/user.util.js';

const router = express.Router();

/* User */
router.post('/', newUserValidator, setUserRole, UserController.registerUser);

/* Admin */
router.post('/admin', newUserValidator, setAdminRole, UserController.registerUser);

/* User,Admin - Verification, Login */
router.post('/verification', userAuth, UserController.verifyUser);
router.post('/login', loginValidator, UserController.login);

export default router;