import Book from '../models/book.model.js';

export const addBook = async (req, res) => {
  const book = await Book.find({ bookName: req.body.bookName });
  if (book.length === 0) {
    return await Book.create(req.body);
  } else {
    throw {
      message: 'Book with this name is already added'
    };
  }
};

export const getAllBooks = async () => {
  const book = await Book.find();
  if (book) {
    return book;
  } else {
    throw {
      message: 'No Books present in database'
    };
  }
};

export const getBookById = async (id) => {
  const book = await Book.findById(id);
  if (book) {
    return book;
  } else {
    throw {
      message: 'Book with this Id is not present'
    };
  }
};

export const updateBookDetailsById = (id, body) => {
  const book = Book.findByIdAndUpdate(id, body);
  if (book) {
    return book;
  } else {
    throw {
      message: 'Book with this Id is not present'
    };
  }
};

export const deleteBookById = (id) => {
  const book = Book.findByIdAndDelete(id);
  if (book) {
    return book;
  } else {
    throw {
      message: 'Book with this Id is not present'
    };
  }
};
