import { z } from "zod";
import { returnAnnouncementSchema } from "./announcements.schemas";

const accountTypeValues = ["buyer", "seller"] as const;

const SchemaRegisterUser = z.object({
  name: z.string().min(1).max(50).nonempty(),
  email: z.string().email().min(1).max(50).nonempty(),
  cpf: z.string().length(11).nonempty(),
  telephone: z.string().length(11).nonempty(),
  birthdate: z.string(),
  description: z.string().min(0).max(250),
  cep: z.string().length(8).nonempty(),
  state: z.string().length(2).nonempty(),
  city: z.string().min(1).max(30).nonempty(),
  street: z.string().min(1).max(50).nonempty(),
  number: z.string().min(1).max(10).nonempty(),
  accountType: z.union([z.literal("buyer"), z.literal("seller")]),
  complement: z.string().max(50).optional(),
  password: z.string().min(6).max(200).nonempty(),
});

const SchemaReturnSchemaUser = SchemaRegisterUser.extend({
  id: z.string().uuid(),
  announcement: z.array(returnAnnouncementSchema).optional(),
});

const SchemaReturnUserWithOutPassword = SchemaReturnSchemaUser.omit({
  password: true,
});

const SchemaUpdateUser = z.object({
  name: z.string().min(1).max(50).optional(),
  email: z.string().email().min(1).max(50).optional(),
  cpf: z.string().length(11).optional(),
  telephone: z.string().length(11).optional(),
  birthdate: z.string().optional(),
  description: z.string().min(0).max(250).optional(),
  cep: z.string().length(8).optional(),
  state: z.string().length(2).optional(),
  city: z.string().min(1).max(30).optional(),
  street: z.string().min(1).max(50).optional(),
  number: z.string().min(1).max(10).optional(),
  accountType: z.union([z.literal("buyer"), z.literal("seller")]).optional(),
  complement: z.string().max(50).optional(),
  password: z.string().min(6).max(200).optional(),
});
const SchemaReturnUpdateUser = SchemaUpdateUser.extend({
  id: z.string().uuid(),
});
const SchemaReturnUpdateUserWithoutPassword = SchemaReturnUpdateUser.omit({
  password: true,
});

export {
  SchemaRegisterUser,
  SchemaReturnUserWithOutPassword,
  SchemaReturnSchemaUser,
  SchemaUpdateUser,
  SchemaReturnUpdateUserWithoutPassword,
};
