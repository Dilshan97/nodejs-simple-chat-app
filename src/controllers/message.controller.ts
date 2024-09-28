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

const sendMessage = (socket: Socket) => {
  return socket.on(constants.SOCKET.EVENTS.SEND_MESSAGE, async (payload, callback) => {
    try {
      const { senderId, receiver, content } = payload as ISocketPayload;

      const message = new Message();
      message.senderId = senderId;
      message.content = content;
      message.receiver = receiver;
      message.save();

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
