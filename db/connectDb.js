import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};
