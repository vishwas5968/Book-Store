import User from '../models/user.model';
import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import { sendEmail } from '../utils/user.util.js';

export const getUserByEmail = async (email) => {
  return User.find({ email: email });
};

export const registerUser = async (body) => {
  let user = await getUserByEmail(body.email.toLowerCase());
  if (user.length === 0) {
    body.email = body.email.toLowerCase();
    body.password = await bcrypt.hash(body.password, 10);
    await User.create(body);
    await sendEmail(body.email);
  } else {
    throw {
      message: 'User with this email is already registered'
    };
  }
};

export const login = async (body) => {
  body.email = body.email.toLowerCase();
  const users = await getUserByEmail({ email: body.email });
  if (users.length === 1) {
    const comparePassword = bcrypt.compare(body.email, users[1].password);
    logger.info(comparePassword, ' Compare Password');
  } else {
    throw 'User with this email is already registered';
  }
  return '';
};

export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
