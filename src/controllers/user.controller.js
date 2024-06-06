import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res) => {
  try {
    console.log('req.body', req.body);
    await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
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

export const registerAdmin = async (req, res) => {
  try {
    console.log('req.body', req.body);
    await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
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
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
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
    console.log(req.body, 'req.body');
    const data = await UserService.login(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
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

export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `Error: ${error}`
    });
    next(error);
  }
};
