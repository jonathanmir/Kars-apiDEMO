import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  schemaCreateComment,
  schemaUpdateComment,
} from "../schemas/comments.schema";
import {
  createCommentController,
  deleteCommentController,
  listCommentController,
  updateCommentController,
} from "../controllers/comments.controller";
import { verifyTokenIsValid } from "../middlewares/validatedToken.middleware";

const commentRoutes: Router = Router();

commentRoutes.post(
  "",
  ensureDataIsValidMiddleware(schemaCreateComment),
  verifyTokenIsValid,
  createCommentController
);

commentRoutes.get("/:id", verifyTokenIsValid, listCommentController);

commentRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(schemaUpdateComment),
  verifyTokenIsValid,
  updateCommentController
);

commentRoutes.delete("/:id", verifyTokenIsValid, deleteCommentController);

export { commentRoutes };
