import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateJwt } from '../utils/user.util.js';
import { getDataInCache, setDataInCache } from '../utils/redis.js';
import HttpStatus from 'http-status-codes';

export const getUserByEmail = async (email) => {
  return User.find({ email: email });
};

export const registerUser = async (body) => {
  let user = await getUserByEmail(body.email.toLowerCase());
  if (user.length === 0) {
    body.email = body.email.toLowerCase();
    body.password = await bcrypt.hash(body.password, 10);
    const jwt = await generateJwt(body.email, body.userRole);
    await setDataInCache(body.email, body);
    // await sendEmail(body.email, jwt);
    return jwt;
  } else {
    throw {
      code: HttpStatus.BAD_REQUEST,
      message: 'User with this email is already registered'
    };
  }
};

export const verifyUser = async (email) => {
  const user = await getDataInCache(email);
  let data = await User.create(JSON.parse(user));
};

export const login = async (req, user) => {
  if (req.body.email === user.email) {
    console.log(req.body.email === user.email);
  } else {
    throw {
      code: HttpStatus.BAD_REQUEST,
      message: 'Enter the correct email'
    };
  }
  req.body.email = req.body.email.toLowerCase();
  const users = await getUserByEmail(req.body.email);
  if (users.length === 1) {
    const compare = await bcrypt.compare(req.body.email, users[0].password);
    if (!compare) throw 'Passwords do not match';
  } else {
    throw 'User with this email is not registered';
  }
};
