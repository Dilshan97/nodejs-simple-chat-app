
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { ClientSession } from "mongoose";
import { IMessageModel } from "../models/message.model";

const save = async (message: IMessageModel, session?: ClientSession) => {
    return await message.save({ session });
};

export default {
    save
}