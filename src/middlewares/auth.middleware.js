import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.SECRET);
    res.locals.user = user;
    console.log(user, 'user');
    next();
  } catch (error) {
    next(error);
  }
};

export const loginAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    console.log(bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.SECRET);
    res.locals.user = user;
    console.log(user, 'user');
    if (req.body.email === user.email) {
      console.log(req.body.email === user.email);
      next();
    } else {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Enter the correct email'
      };
    }
  } catch (error) {
    next(error);
  }
};
