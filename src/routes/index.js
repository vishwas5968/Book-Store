import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route.js';
import cartRoute from './cart.route.js';
import wishlistRoute from './wishlist.route.js';
import orderRoute from './order.route.js';
import customerDetailsRoute from './customerDetails.route.js'

const routes = () => {
  router.use('/users', userRoute);
  router.use('/books', bookRoute);
  router.use('/carts', cartRoute);
  router.use('/wishlists', wishlistRoute);
  router.use('/orders', orderRoute);
  router.use('/customer-details', customerDetailsRoute);
  return router;
};

export default routes;
