import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { SchemaRegisterUser, SchemaUpdateUser } from "../schemas/users.schemas";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";
import { verifyCpfExists } from "../middlewares/verifyCpfExists.middleware";
import { verifyTokenIsValid } from "../middlewares/validatedToken.middleware";
import verifyUserExists from "../middlewares/ensureUserExists.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(SchemaRegisterUser),
  verifyEmailExists,
  verifyCpfExists,
  createUserController
);

userRoutes.get("", verifyTokenIsValid, listUserController);

userRoutes.get("/:id", listUserByIdController);

userRoutes.patch(
  "/:id",
  //verifyUserExists,
  ensureDataIsValidMiddleware(SchemaUpdateUser),
  verifyTokenIsValid,
  updateUserController
);

userRoutes.delete(
  "/:id",
  verifyUserExists,
  verifyTokenIsValid,
  deleteUserController
);

export { userRoutes };
