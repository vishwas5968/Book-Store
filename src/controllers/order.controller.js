import * as OrderService from '../services/order.service.js';
import HttpStatus from 'http-status-codes';

export const getOrderDetails = async (req, res) => {
  try {
    const order = await OrderService.getOrderDetails(res);
    res.status(HttpStatus.OK).json({
      success: true,
      order: order,
      message: 'Please verify yourself by using URL sent to your Email-Id'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};
