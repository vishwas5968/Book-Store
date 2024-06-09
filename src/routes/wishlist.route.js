import express from 'express';
import { userAuth } from '../middlewares/auth.middleware.js';
import * as WishlistController from '../controllers/wishlist.controller.js';

const router = express.Router();

router.get('/', userAuth, WishlistController.getWishlistDetails);

router.post('/add/:bookId', userAuth, WishlistController.addBookToWishlist);

router.post(
  '/remove/:bookId',
  userAuth,
  WishlistController.removeBookFromWishlist
);

export default router;
