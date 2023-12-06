import { Router } from "express";
import { passwordResetController } from "../controllers/recoverPassword.controller";

const resetPassowordRouter: Router = Router();

resetPassowordRouter.use("/:token", passwordResetController);

export default resetPassowordRouter;
