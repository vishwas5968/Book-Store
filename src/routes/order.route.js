import express from 'express';
import { userAuth } from '../middlewares/auth.middleware.js';
import * as OrderController from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', userAuth, OrderController.getOrderDetails);

export default router;
