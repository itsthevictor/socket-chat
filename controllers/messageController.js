import { StatusCodes } from "http-status-codes";
import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";

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
  const messageObject = {
    senderId: req.user.userId,
    receiverId: req.params.id,
    text: req.body.text,
    image: req.body.image,
  };
  const message = await Message.create(messageObject);
  res.status(StatusCodes.CREATED).json({ message });
};
