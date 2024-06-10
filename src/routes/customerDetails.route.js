import express from 'express';
import { userAuth } from '../middlewares/auth.middleware.js';
// eslint-disable-next-line max-len
import * as CustomerDetailsController from '../controllers/customerDetails.controller.js';

export const router = express.Router();

router.post('/', userAuth, CustomerDetailsController.addCustomerDetails);

router.get('/', userAuth, CustomerDetailsController.getCustomerDetails);
