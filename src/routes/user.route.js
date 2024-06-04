/* eslint-disable prettier/prettier */
import express from 'express';
import * as UserController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

/* Admin */
router.post('/admin/registration', newUserValidator, UserController.registerAdmin);
router.post('/admin/login', loginValidator, UserController.login);

/* Admin - Product */
router.post('/admin/add/book');
router.put('/admin/update/book/:productId');
router.delete('/admin/delete/book/:productId');

/* Admin-Order */
router.get('/admin/get/order');

/* User */
router.post('/registration', newUserValidator, UserController.registerUser);
router.post('/verification/:token', userAuth);
router.post('/login', loginValidator, UserController.login);

/* Product */
router.post('/add_wish_list/:productId');
router.delete('/remove_wishlist_item/:productId');
router.get('/get_wishlist_items');

/* Customer Details */
router.put('/edit_user');

/* Order */
router.post('/add/order');

/* Feedback */
router.post('/add/feedback/:productId');
router.post('/get/feedback/:productId');

export default router;
