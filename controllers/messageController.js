import { StatusCodes } from 'http-status-codes';
import Message from '../models/MessageModel.js';
import User from '../models/UserModel.js';
import { formatImage } from '../middleware/multerMiddleware.js';
import cloudinary from 'cloudinary';
export const getUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.userId } });
  res.status(StatusCodes.OK).json({ users });
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { receiverId: req.user.userId, senderId: req.params.id },
      { receiverId: req.params.id, senderId: req.user.userId },
    ],
  });
  res.status(StatusCodes.OK).json({ messages });
};

export const sendMessage = async (req, res) => {
  let messageObject;
  if (req.body.image) {
    const uploadResponse = await cloudinary.uploader.upload(req.body.image);

    messageObject = {
      senderId: req.user.userId,
      receiverId: req.params.id,
      text: req.body.text,
      image: uploadResponse.secure_url,
    };
  } else {
    messageObject = {
      senderId: req.user.userId,
      receiverId: req.params.id,
      text: req.body.text,
    };
  }

  const message = await Message.create(messageObject);
  // TO DO: realtime functionality here with socket.io
  res.status(StatusCodes.CREATED).json({ message });
};
