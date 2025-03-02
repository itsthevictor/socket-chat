import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import cloudinary from 'cloudinary';
import upload, { formatImage } from '../middleware/multerMiddleware.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  const userWithoutPassword = user.toJSON();
  if (!user) throw new NotFoundError('no user');
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();

  res.status(StatusCodes.OK).json({ users: users });
};

export const getUsers = async (req, res) => {
  const users = User.find();
  res.status(StatusCodes.OK).json({ users });
};

export const updateUser = async (req, res) => {
  // console.log(req.body)
  // const newUser = { ...req.body };
  // delete newUser.password;
  // console.log(req.file);

  // if (req.file) {
  //   const file = formatImage(req.file);
  //   const response = await cloudinary.v2.uploader.upload(file);

  //   newUser.avatar = response.secure_url;
  //   newUser.avatarPublicId = response.public_id;
  // }
  // const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // if (req.file && updatedUser.avatarPublicId) {
  //   await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  // }
  // res.status(StatusCodes.OK).json({ msg: "user updated" });

  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      throw new BadRequestError('pic is required');
    }
    const uploadRes = await cloudinary.v2.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        avatar: uploadRes.secure_url,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ updatedUser });
  } catch (error) {
    console.log('error');
  }
};
