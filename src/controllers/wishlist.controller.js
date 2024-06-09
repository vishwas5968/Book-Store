import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service.js';

export const getWishlistDetails = async (req, res) => {
  try {
    const wishlist = await WishlistService.getWishlistDetails(res);
    res.status(HttpStatus.OK).json({
      success: true,
      wishlist: wishlist ? wishlist : 'Wishlist is empty',
      message: 'Successfully fetched Wishlist'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const addBookToWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.addBookToWishlist(req, res);
    res.status(HttpStatus.OK).json({
      success: true,
      wishlist: wishlist,
      message: 'Book added to wishlist'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const removeBookFromWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.removeBookFromWishlist(req, res);
    res.status(HttpStatus.OK).json({
      success: true,
      wishlist: wishlist,
      message: 'Book removed from wishlist'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};
