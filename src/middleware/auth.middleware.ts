/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "./errors/UnauthorizedError";
import { IAuthRecord } from "../models/user.model";
import { ExtendedError, Socket } from "socket.io";
import InternalServerError from "./errors/InternalServerError";

const authorizer = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized!");
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const tokenPayload = jwt.verify(
      accessToken,
      String(process.env.JWT_SECRET)
    ) as IAuthRecord;

    req.auth = tokenPayload;

    next();
  } catch (error) {
    throw new UnauthorizedError("Unauthorized!");
  }
};

const socketAuthorizer = async (socket: Socket, next: (err?: ExtendedError)=> void) => {
  try {
    const accessToken = socket.handshake.query.token as string;

    if (!accessToken) {
      next(new UnauthorizedError("Unauthorized!"));
    }

    const tokenPayload = jwt.verify(
      accessToken,
      String(process.env.JWT_SECRET)
    ) as IAuthRecord;

    socket.handshake.auth = tokenPayload;

    next();
  } catch (error) {
    next(new InternalServerError("rrr"));
  }
};

export default {
  authorizer,
  socketAuthorizer,
};
