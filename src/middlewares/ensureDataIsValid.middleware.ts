import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const dataValidation = schema.parse(req.body);
    req.body = dataValidation;
    return next();
  };

export default ensureDataIsValidMiddleware;
