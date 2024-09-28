/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service";
import NotFoundError from "../middleware/errors/NotFoundError";
import { IUserModel } from "../models/user.model";
import Group from "../models/group.model";

const createGroup = async (req: Request, res: Response) => {
  const { groupName, members } = req.body;

  const group = new Group();
  group.groupName = groupName;

  const dbMembers = await UserService.findByIds(members);

  if (!dbMembers) {
    throw new NotFoundError("Members not found!");
  }

  for (const member of members) {
    const dbMember = dbMembers.find(
      (user: IUserModel) =>
        (user._id as any).toString() === member.toString()
    );

    if (!dbMember) {
      throw new NotFoundError(`${member} is member not found!`);
    }
    group.members.push(member);
  }

  group.save();

  res.status(StatusCodes.CREATED).json({
    message: "Group created!",
    payload: group,
  });
};

export default {
  createGroup,
};
