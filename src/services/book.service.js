import Book from '../models/book.model.js';

export const addBook = (req, res) => {
  // req.body.admin_user_id = res.locals.user.id;
  const book = Book.find({ bookName: req.body.bookName });
  if (book.length === 0) {
    return Book.create(req.locals.user);
  } else {
    throw {
      message: 'Book with this name is already added'
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
  const book = Book.findByIdAndUpdate({ _id: id }, body);
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
