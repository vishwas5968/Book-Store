import Wishlist from '../models/wishlist.model.js';
import Book from '../models/book.model.js';

export const getWishlistDetails = async (res) => {
  const wishlist = await Wishlist.find({
    wishlistOwner: res.locals.user.userInfo
  });
  return wishlist.length === 0 ? null : wishlist;
};

export const addBookToWishlist = async (req, res) => {
  const wishlist = await getWishlistDetails(res);
  const bookInfo = await Book.findById(req.params.bookId);
  let updatedWishlist;
  if (wishlist === null) {
    let newWishlist = {
      wishlistOwner: res.locals.user.userInfo,
      books: []
    };
    newWishlist.books.push(bookInfo);
    updatedWishlist = await Wishlist.create(newWishlist);
  } else {
    for (let book of wishlist[0].books) {
      if (book._id == req.params.bookId) {
        book.quantity += 1;
        updatedWishlist = await Wishlist.findByIdAndUpdate(
          wishlist[0]._id,
          wishlist[0],
          {
            new: true
          }
        );
      }
    }
    if (updatedWishlist === undefined) {
      wishlist[0].books.push(bookInfo);
      updatedWishlist = await Wishlist.findByIdAndUpdate(
        wishlist[0]._id,
        wishlist[0],
        {
          new: true
        }
      );
    }
  }
  return updatedWishlist;
};

export const removeBookFromWishlist = async (req, res) => {
  const wishlist = await getWishlistDetails(res);
  const book = await Book.findById(req.params.bookId);
  if (book.quantity <= 0) throw 'Book with this Id is not present in stock';
  let updatedWishlist;
  if (wishlist === null) {
    throw 'Wishlist is Empty';
  } else {
    for (let book of wishlist[0].books) {
      if (book._id == req.params.bookId) {
        const indexOfBook = wishlist[0].books.indexOf(book);
        console.log(indexOfBook);
        wishlist[0].books.splice(indexOfBook, 1);
        console.log(wishlist[0].books);
        updatedWishlist = await Wishlist.findByIdAndUpdate(
          wishlist[0]._id,
          wishlist[0],
          {
            new: true
          }
        );
      }
    }
    if (updatedWishlist === undefined) {
      throw 'Book with this Id is not present in Wishlist';
    }
  }
  console.log('updatedWishlist2', updatedWishlist);
  return updatedWishlist;
};
