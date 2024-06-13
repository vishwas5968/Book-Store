import * as CustomerDetailsService from '../services/customerDetails.service.js';
import HttpStatus from 'http-status-codes';

export const addCustomerDetails = async (req, res) => {
  try {
    const customerDetails = await CustomerDetailsService.addCustomerDetails(
      req,
      res
    );
    res.status(HttpStatus.OK).json({
      success: true,
      customerDetails: customerDetails,
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

export const getCustomerDetails = async (req, res) => {
  try {
    const customerDetails = await CustomerDetailsService.getCustomerDetails(
      req,
      res
    );
    res.status(HttpStatus.OK).json({
      success: true,
      customerDetails: customerDetails,
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
