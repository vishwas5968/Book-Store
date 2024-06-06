import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route.js';

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/bookstore_user', userRoute);
  router.use('/bookstore_user/book', bookRoute);
  return router;
};

export default routes;
