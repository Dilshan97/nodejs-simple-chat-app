/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "./errors/UnauthorizedError";
import { IAuthRecord } from "../models/user.model";

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

export default {
  authorizer,
};
