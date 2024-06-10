import CustomerDetailsModel from '../models/customerDetails.model.js';

export const addCustomerDetails = async (req, res) => {
  let customerDetails = await CustomerDetailsModel.findOne({
    customerId: res.locals.user.userInfo
  });
  req.body.customerId = res.locals.user.userInfo;
  if (!customerDetails) {
    customerDetails = await CustomerDetailsModel.create(req.body);
  } else {
    customerDetails = await CustomerDetailsModel.findByIdAndUpdate(
      res.locals.user.userInfo,
      req.body,
      { new: true }
    );
  }
};

export const getCustomerDetails = async (req, res) => {
  let customerDetails = await CustomerDetailsModel.findOne({
    customerId: res.locals.user.userInfo
  });
  return customerDetails
    ? customerDetails
    : 'Customer Details has not yet' + ' been entered';
};
