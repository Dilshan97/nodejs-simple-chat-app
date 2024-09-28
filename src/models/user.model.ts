/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { Document, model, Schema } from "mongoose";

interface IUser {
    phoneNumber: string;
    username: string;
    password: string;
    online: boolean;
}

interface IUserModel extends IUser, Document { }

interface IAuthRecord {
    _id: unknown;
    phoneNumber: string;
}

const UserSchema: Schema<IUserModel> = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    online: { 
        type: Boolean, 
        default: false 
    },
}, { versionKey: false, timestamps: true});

export default model<IUserModel>("User", UserSchema);

export {
    IUser,
    IUserModel,
    IAuthRecord
}