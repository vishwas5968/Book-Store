import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res) => {
  try {
    const token = await UserService.registerUser(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      token: token,
      message: 'Please verify yourself by using URL sent to your Email-Id'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    await UserService.registerUser(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message:
        'Please verify yourself by using the OTP and URL sent to your Email-Id'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    await UserService.verifyUser(res.locals.user.email);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req, res.locals.user);
    res.status(HttpStatus.OK).json({
      success: true,
      data: data,
      message: 'User successfully logged in'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
    next(error);
  }
};
