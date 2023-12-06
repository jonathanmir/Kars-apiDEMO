import { Request, Response } from 'express';
import { loginServices } from '../services/login/login.service';

const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const login = await loginServices(req.body)
  return res.status(200).json({token: login});
};

export { loginController };