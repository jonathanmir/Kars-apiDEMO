import { Router } from "express";
import { passwordForgotController } from "../controllers/recoverPassword.controller";

const forgotPasswordRouter: Router = Router();

forgotPasswordRouter.use("", passwordForgotController);

export default forgotPasswordRouter;
