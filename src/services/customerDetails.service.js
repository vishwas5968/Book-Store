import CustomerDetailsModel from '../models/customerDetails.model.js';

export const addCustomerDetails = async (req, res) => {
  let customerDetails = await CustomerDetailsModel.findOne({
    customerId: res.locals.user.userInfo
  });
  req.body.customerId = res.locals.user.userInfo;
  console.log(customerDetails)
  if (!customerDetails) {
    customerDetails = await CustomerDetailsModel.create(req.body);
  } else {
    customerDetails = await CustomerDetailsModel.findOneAndUpdate(
      {customerId: res.locals.user.userInfo},
      req.body,
      { new: true }
    );
  }
  return customerDetails
};

export const getCustomerDetails = async (req, res) => {
  console.log(res.locals.user.userInfo)
  let customerDetails = await CustomerDetailsModel.findOne({
    customerId: res.locals.user.userInfo
  });
  console.log(customerDetails)
  if (!customerDetails) {
      throw 'Customer Details has not yet been entered'
  }
  return customerDetails
};
