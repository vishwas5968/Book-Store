import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res, next) => {
  try {
    req.body.userRole = 'user';
    await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      success: true,
      message:
        'Please verify yourself by using the OTP and URL sent to your Email-Id'
    });
  } catch (error) {
    next(error);
  }
};

export const registerAdmin = async (req, res) => {
  try {
    req.body.userRole = 'admin';
    await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      success: true,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CREATED).json({
      success: false,
      message: `Error: ${error}`
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
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
    next(error);
  }
};
