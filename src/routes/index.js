import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route.js';
import cartRoute from './cart.route.js';
import wishlistRoute from './wishlist.route.js';

const routes = () => {
  router.use('/bookstore_user', userRoute);
  router.use('/bookstore_user/book', bookRoute);
  router.use('/bookstore_user/cart', cartRoute);
  router.use('/bookstore_user/wishlist', wishlistRoute);
  return router;
};

export default routes;
