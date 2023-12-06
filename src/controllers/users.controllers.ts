import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { listUsersService } from "../services/users/listUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUserByIdService } from "../services/users/listUserById.service";

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).send(user);
};

const listUserByIdController = async (req: Request, res: Response) => {
  const userId: string = String(req.params.id);
  const users = await listUserByIdService(userId);
  return res.status(201).send(users);
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.status(201).send(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const userId: string = String(req.params.id);
  const user = await updateUserService(req.body, userId);
  return res.status(201).send(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId: string = String(req.params.id);
  await deleteUserService(userId);
  return res.status(204).send();
};

export {
  createUserController,
  listUserByIdController,
  listUserController,
  updateUserController,
  deleteUserController,
};
