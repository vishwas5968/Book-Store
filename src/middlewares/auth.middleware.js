import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.params('token');
    console.log(bearerToken)
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const { user } = await jwt.verify(bearerToken, process.env.SECRET);
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};