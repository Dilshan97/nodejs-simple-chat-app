
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import mongoose, { Document, model, Schema } from "mongoose";

interface IMember {
    _id: string | mongoose.Types.ObjectId;
}

interface IGroup {
    groupName: string;
    members: IMember[];
}

interface IGroupModel extends IGroup, Document { }

const GroupSchema: Schema<IGroupModel> = new Schema({
    groupName: {
        type: String,
        required: true,
    },
    members: { 
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ], 
        required: true 
    },
}, { versionKey: false, timestamps: true});

export default model<IGroupModel>("Group", GroupSchema);

export {
    IGroup,
    IGroupModel,
}