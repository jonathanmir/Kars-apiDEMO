import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { SchemaLoginUser } from "../schemas/login.schema";
import { loginController } from "../controllers/login.controller";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  ensureDataIsValidMiddleware(SchemaLoginUser),
  loginController
);

export { loginRouter };
