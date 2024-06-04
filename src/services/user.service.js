import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
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

//update single user
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

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
