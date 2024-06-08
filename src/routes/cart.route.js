import express from 'express';
import { userAuth } from '../middlewares/auth.middleware.js';
import * as CartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', userAuth, CartController.getCartDetails);

router.post('/add/:bookId', userAuth, CartController.addBookToCart);

router.post('/remove/:bookId', userAuth, CartController.removeBookFromCart);

export default router;
