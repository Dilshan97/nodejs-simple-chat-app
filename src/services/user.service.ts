/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { ClientSession, ObjectId } from "mongoose";
import User, { IUserModel } from "../models/user.model";

const save = async (user: IUserModel, session?: ClientSession) => {
  return await user.save({ session });
};

const findByPhoneNumber = async (phoneNumber: string) => {
  return await User.findOne({ phoneNumber });
};

const findByIds = async (userIds: Array<string | mongoose.Types.ObjectId | ObjectId>) => {
  return await User.find({ _id: { $in: userIds } });
};

export default {
  save,
  findByPhoneNumber,
  findByIds
};
