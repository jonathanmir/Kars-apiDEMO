import { z } from "zod";
import {
  SchemaRegisterUser,
  SchemaReturnSchemaUser,
  SchemaReturnUpdateUserWithoutPassword,
  SchemaReturnUserWithOutPassword,
  SchemaUpdateUser,
} from "../schemas/users.schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type iUserRequest = z.infer<typeof SchemaRegisterUser>;

type IUserReturn = z.infer<typeof SchemaReturnSchemaUser>;

type IUserReturnWithOutPassword = z.infer<
  typeof SchemaReturnUserWithOutPassword
>;

type IUpdatedUserReturnWithoutPassword = z.infer<
  typeof SchemaReturnUpdateUserWithoutPassword
>;

type iUserRepo = Repository<User>;
type iManyUser = DeepPartial<IUserReturn>;
type iUserPartial = DeepPartial<User>;

export {
  iUserRequest,
  IUserReturn,
  IUserReturnWithOutPassword,
  iUserRepo,
  iManyUser,
  iUserPartial,
  IUpdatedUserReturnWithoutPassword,
};
