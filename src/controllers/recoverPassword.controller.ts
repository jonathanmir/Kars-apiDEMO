import { Request, Response } from "express";
import { forgotPasswordService } from "../services/passwordRecovery/passwordRecovery.service";
import { resetPasswordService } from "../services/passwordRecovery/resetPassword.service";

export const passwordForgotController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { email } = request.body;

  const message = await forgotPasswordService(email);
  return response.status(200).json({ message });
};

export const passwordResetController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { password } = request.body;
  const token = request.params.token;

  const message = await resetPasswordService(token, password);
  return response.status(200).json({ message });
};
