import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service.js';

export const getCartDetails = (req, res) => {
  try {
    const cart = CartService.getCartDetails(res);
    res.status(HttpStatus.OK).json({
      success: true,
      cart: cart ? cart : 'Cart is empty',
      message: 'Successfully fetched Cart'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const addBookToCart = async (req, res) => {
  try {
    const cart = await CartService.addBookToCart(req, res);
    res.status(HttpStatus.OK).json({
      success: true,
      cart: cart,
      message: 'Please verify yourself by using URL sent to your Email-Id'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const removeBookFromCart = async (req, res) => {
  try {
    const cart = await CartService.removeBookFromCart(req, res);
    res.status(HttpStatus.OK).json({
      success: true,
      cart: cart,
      message: 'Please verify yourself by using URL sent to your Email-Id'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};
