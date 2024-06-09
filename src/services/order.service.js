import CartModel from '../models/cart.model.js';
import OrderModel from '../models/order.model.js';

export const getOrderDetails = async (res) => {
  const cart = await CartModel.findOne({ cartOwner: res.locals.user.userInfo });
  let order = await OrderModel.findOne({ orderBy: res.locals.user.userInfo });
  if (!order) {
    order = await OrderModel.create({
      orderBy: res.locals.user.userInfo,
      books: cart.books,
      isPurchased: true
    });
  }
  cart.books = [];
  cart.cartTotal = 0;
  await CartModel.save();
  return order;
};
