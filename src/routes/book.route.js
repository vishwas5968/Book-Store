import { bookValidation } from '../validators/book.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import express from 'express';
import * as BookController from '../controllers/book.controller.js';

const router = express.Router();

/* User, Admin - Product */
router.get('/', userAuth, BookController.getAllBooks);
router.get('/:bookId', userAuth, BookController.getBookById);

/* Admin - Product */
router.post('/', userAuth, bookValidation, BookController.addBook);
router.put('/:bookId', userAuth, BookController.updateBookDetailsById);
router.delete('/:bookId', userAuth, BookController.deleteBookById);

export default router;
