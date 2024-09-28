
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { constants } from "../constants";
import mongoose, { Document, model, Schema } from "mongoose";

interface IMessage {
    senderId: mongoose.Types.ObjectId;
    content: string;
    receiver: {
        type: string;
        user: mongoose.Types.ObjectId;
        group: mongoose.Types.ObjectId
    }
}

interface IMessageModel extends IMessage, Document { }

interface ISocketPayload {
    content: string;
    receiver: {
        type: string;
        user: mongoose.Types.ObjectId;
        group: mongoose.Types.ObjectId
    }
}

const MessageSchema: Schema<IMessageModel> = new Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    receiver: {
        type: {
            type: String, 
            enum: [
                constants.MESSAGE.RECEIVERS.USER, 
                constants.MESSAGE.RECEIVERS.GROUP
            ]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        },
        group: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Group", 
        },
    },
    content: { 
        type: String, 
        required: true 
    },
}, { versionKey: false, timestamps: true});

export default model<IMessageModel>("Message", MessageSchema);

export {
    IMessage,
    IMessageModel,
    ISocketPayload
}