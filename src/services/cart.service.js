// noinspection EqualityComparisonWithCoercionJS
import Cart from '../models/cart.model.js';
import BookModel from '../models/book.model.js';

export const getCartDetails = async (res) => {
  const cart = await Cart.find({ cartOwner: res.locals.user.userInfo });
  return cart.length === 0 ? null : cart;
};

export const addBookToCart = async (req, res) => {
  const cart = await getCartDetails(res);
  const bookInfo = await BookModel.findById(req.params.bookId);
  let bookQuantity = bookInfo.quantity;
  bookInfo.quantity = 1;
  let updatedCart;
  if (cart === null) {
    let newCart = {
      cartOwner: res.locals.user.userInfo,
      books: [],
      cartTotal: bookInfo.price
    };
    newCart.books.push(bookInfo);
    updatedCart = await Cart.create(newCart);
  } else {
    for (let book of cart[0].books) {
      if (book._id == req.params.bookId) {
        cart[0].cartTotal += book.price;
        book.quantity += 1;
        bookInfo.quantity = bookQuantity - 1;
        await BookModel.findByIdAndUpdate(bookInfo);
        updatedCart = await Cart.findByIdAndUpdate(cart[0]._id, cart[0], {
          new: true
        });
      }
    }
    if (updatedCart === undefined) {
      cart[0].books.push(bookInfo);
      cart[0].cartTotal += bookInfo.price;
      bookInfo.quantity += 1;
      updatedCart = await Cart.findByIdAndUpdate(cart[0]._id, cart[0], {
        new: true
      });
    }
  }
  return updatedCart;
};

export const removeBookFromCart = async (req, res) => {
  const cart = await getCartDetails(res);
  const book = await BookModel.findById(req.params.bookId);
  if (book.quantity === 0) throw 'Book with this Id is not present in stock';
  book.quantity = 1;
  let updatedCart;
  if (cart == null) {
    throw 'Cart is Empty';
  } else {
    for (let book of cart[0].books) {
      console.log('book', book);
      console.log(book._id == req.params.bookId);
      if (book._id == req.params.bookId) {
        cart[0].cartTotal -= book.price;
        book.quantity -= 1;
        updatedCart = await Cart.findByIdAndUpdate(cart[0]._id, cart[0], {
          new: true
        });
      }
    }
    if (updatedCart === undefined) {
      throw 'Book with this Id is not present in cart';
    }
  }
  console.log('updatedCart2', updatedCart);
  return updatedCart;
};
