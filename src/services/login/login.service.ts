import { compare } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { iUserRepo } from '../../interfaces/users.interfaces';
import jwt from 'jsonwebtoken';
import { iLogin } from '../../interfaces/login.interface';

const loginServices = async (loginData: iLogin): Promise<string> => {
  
  const email = loginData.email;

  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const getUser = await userRepo.findOneBy({ email });

  if(!getUser){
    throw new AppError('Invalid credentials', 401)
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    getUser!.password
  );

  if (!matchPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  const secretKey: string | undefined = process.env.SECRET_KEY!;
  const expireIn: string | undefined = process.env.EXPIRES_IN!;

  if (!secretKey) {
    console.log('env var SECRET_KEY not declared');
  }
  if (!expireIn) {
    console.log('env var EXPIRES_IN not declared');
  }

  const token: string = jwt.sign(
    {
      userType: getUser!.accountType,
    },
    secretKey,
    {
      expiresIn: expireIn,
      subject: getUser!.id.toString(),
    }
  );

  return token;
};

export { loginServices }

