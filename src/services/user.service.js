import User from '../models/user.model';
import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import { generateJwt, sendEmail } from '../utils/user.util.js';
import { getDataInCache, setDataInCache } from '../utils/redis.js';

export const getUserByEmail = async (email) => {
  return User.find({ email: email });
};

export const registerUser = async (body) => {
  console.log('body', body);
  let user = await getUserByEmail(body.email.toLowerCase());
  if (user.length === 0) {
    body.email = body.email.toLowerCase();
    body.password = await bcrypt.hash(body.password, 10);
    const jwt = await generateJwt(body.email, body.userRole);
    await setDataInCache(body.email, body);
    // await sendEmail(body.email, jwt);
    console.log(body.email, jwt);
    console.log(await getDataInCache(body.email));
  } else {
    throw {
      message: 'User with this email is already registered'
    };
  }
};

export const verifyUser = async (email) => {
  const user = await getDataInCache(email);
  console.log(user);
  let data = await User.create(JSON.parse(user));

  return
};

export const login = async (body) => {
  body.email = body.email.toLowerCase();
  const users = await getUserByEmail(body.email);
  console.log('User', users);
  if (users.length === 1) {
    const comparePassword = await bcrypt.compare(body.email, users[0].password);
    logger.info(comparePassword, ' Compare Password');
  } else {
    throw 'User with this email is already registered';
  }
};
