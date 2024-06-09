import express from 'express';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', userAuth, OrderController.getOrderDetails);
