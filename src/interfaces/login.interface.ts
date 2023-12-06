import { z } from "zod";
import { SchemaLoginUser } from "../schemas/login.schema";

type iLogin = z.infer<typeof SchemaLoginUser>;

export { iLogin };
