import BookModel from '../models/book.model.js';
import CartModel from '../models/cart.model.js';
import OrderModel from '../models/order.model.js';

export const getOrderDetails = async (res) => {
  const cart = await CartModel.findOne({ cartOwner: res.locals.user.userInfo });
  if (cart.books.length === 0) {
    throw 'There are no books present in the cart';
  }
  let order = await OrderModel.create({
     orderBy: res.locals.user.userInfo,
     books: cart.books,
     isPurchased: true,
     orderTotal: cart.cartTotal
   });
  for (let book of cart.books ) {
    let data = await BookModel.findById(book._id)
    data.quantity -= book.quantity
    await BookModel.findByIdAndUpdate(book._id,data);
  }
  await CartModel.findByIdAndDelete(cart._id)
  return order;
};
