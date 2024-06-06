import { bookValidation } from '../validators/book.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import express from 'express';
import * as BookController from '../controllers/book.controller.js';

const router = express.Router();

/* Admin - Product */
router.delete('/admin/:productId', BookController.getBookById);
router.post('/admin', userAuth, bookValidation, BookController.addBook);
router.put('/admin/:productId', userAuth, BookController.updateBookDetailsById);
router.delete('/admin/:productId', userAuth, BookController.deleteBookById);

/* User - Product */
router.get('/user/:productId', userAuth, BookController.getBookById);

export default router;
