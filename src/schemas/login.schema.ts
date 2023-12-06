import { z } from 'zod';


const SchemaLoginUser = z.object({
  email: z.string(),
  password: z.string(),
});


export {SchemaLoginUser}