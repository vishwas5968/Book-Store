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
  console.log(user);
  let data = await User.create(JSON.parse(user));
  return await generateJwt(data._id, data.userRole);
};

export const login = async (req) => {
  req.body.email = req.body.email.toLowerCase();
  const users = await getUserByEmail(req.body.email);
  const jwt = await generateJwt(users._id, users.userRole);
  if (users.length === 1) {
    const compare = await bcrypt.compare(req.body.password, users[0].password);
    if (!compare) throw 'Passwords do not match';
    return jwt;
  } else {
    throw 'User with this email is not registered';
  }
};
