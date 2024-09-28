/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Socket } from "socket.io";
import Message, { ISocketPayload } from "../models/message.model";
import { constants } from "../constants";
import GroupService from "../services/group.service";
import NotFoundError from "../middleware/errors/NotFoundError";
import buildSocketResponse from "../utils/common";
import UserService from "../services/user.service";
import ConflictError from "../middleware/errors/ConflictError";
import mongoose from "mongoose";

const sendMessage = (socket: Socket) => {
  return socket.on(constants.SOCKET.EVENTS.SEND_MESSAGE, async (payload, callback) => {
    try {
      const { receiver, content } = payload as ISocketPayload;

      //validate sender
      const dbSender = await UserService.findById(socket.handshake.auth._id);
      
      if(!dbSender) throw new NotFoundError("User not found!");

      //validate if receiver is user
      if(receiver.type === constants.MESSAGE.RECEIVERS.USER) {
        const dbReceiver = await UserService.findById(receiver.user);

        if(!dbReceiver) throw new NotFoundError("Receiver not found!");
      }

      //validate if receiver is group
      else if(receiver.type === constants.MESSAGE.RECEIVERS.GROUP) {
        const dbGroup = await GroupService.findById(receiver.group);

        if(!dbGroup) throw new NotFoundError("Group not found!");

        if (!dbGroup.members.includes(dbSender._id as mongoose.Types.ObjectId))
          throw new ConflictError("User is not a member of the group!");
      }

      //save message to db
      const message = new Message();
      message.senderId = dbSender._id as mongoose.Types.ObjectId;
      message.content = content;
      message.receiver = receiver;
      message.save();

      //emit to recipient socket.io room or group members.
      if (receiver.type === constants.MESSAGE.RECEIVERS.USER) {
        socket
          .to(receiver.user.toString())
          .emit(constants.SOCKET.EVENTS.RECEIVE_MESSAGES, message);
      } else if (receiver.type === constants.MESSAGE.RECEIVERS.GROUP) {
        const dbGroup = await GroupService.findById(receiver.group);

        if (!dbGroup) throw new NotFoundError("Group not found!");

        for (const member of dbGroup.members) {
          socket
            .to(member.toString())
            .emit(constants.SOCKET.EVENTS.RECEIVE_MESSAGES, message);
        }
      }

      callback(buildSocketResponse(true, null, message));
    } catch (error: any) {
        if (typeof callback !== "function") {
            console.log(error);
        } else {
            console.log(error);
            callback(buildSocketResponse(false, error.message, null));
        }
    }
  });
};

export default {
  sendMessage,
};
