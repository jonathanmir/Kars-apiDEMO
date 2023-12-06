import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";
import { listCommentsByAnnouncementServices } from "../services/comments/listComments.service";
import { updateCommentService } from "../services/comments/updateComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";

const createCommentController = async (req: Request, res: Response) => {
  const comment = await createCommentService(req.body);
  return res.status(201).send(comment);
};

const listCommentController = async (req: Request, res: Response) => {
  const comments = await listCommentsByAnnouncementServices(req.params.id);
  return res.status(201).send(comments);
};

const updateCommentController = async (req: Request, res: Response) => {
  const commentUpdated = await updateCommentService(req.body, req.params.id);
  return res.status(201).send(commentUpdated);
};

const deleteCommentController = async (req: Request, res: Response) => {
  await deleteCommentService(req.params.id);
  return res.status(204).send();
};

export {
  createCommentController,
  listCommentController,
  updateCommentController,
  deleteCommentController,
};
