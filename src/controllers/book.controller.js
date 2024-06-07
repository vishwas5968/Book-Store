import * as BookService from '../services/book.service.js';
import HttpStatus from 'http-status-codes';

export const addBook = async (req, res) => {
  try {
    console.log(req.body);
    const data = await BookService.addBook(req, res);
    res.status(HttpStatus.OK).json({
      data,
      success: true,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const book = await BookService.getAllBooks();
    res.status(HttpStatus.OK).json({
      success: true,
      data: book,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await BookService.getBookById(req.params.productId);
    res.status(HttpStatus.OK).json({
      success: true,
      data: book,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const updateBookDetailsById = async (req, res) => {
  try {
    const book = await BookService.updateBookDetailsById(req.body.id);
    res.status(HttpStatus.OK).json({
      success: true,
      data: book,
      message: 'Book updated successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const book = await BookService.deleteBookById(req.body.id);
    res.status(HttpStatus.OK).json({
      success: true,
      data: book,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};
