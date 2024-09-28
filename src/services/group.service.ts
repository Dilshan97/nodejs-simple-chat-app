
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import mongoose, { ClientSession } from "mongoose";
import Group, { IGroupModel } from "../models/group.model";

const save = async (group: IGroupModel, session?: ClientSession) => {
    return await group.save({ session });
};

const findById = async (_id: string | mongoose.Types.ObjectId) => {
    return await Group.findById(_id);
};

export default {
    save,
    findById
}