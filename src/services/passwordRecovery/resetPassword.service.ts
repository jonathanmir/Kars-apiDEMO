import bcrypt from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

export const resetPasswordService = async (token: string, password: string) => {
  try {
    const hashes = 10;

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const resetToken = token;

    const user = await userRepository.findOne({
      where: {
        resetToken,
      },
    });

    console.log(user?.resetTokenExpiration);

    if (!user || user.resetTokenExpiration! < new Date()) {
      throw new AppError("Token inválido ou expirado.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, hashes);

    const resetPass = {
      ...user,
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiration: null,
    };

    await userRepository.save(resetPass);

    return "Senha redefinida com sucesso.";
  } catch (error) {
    console.error(error);
    throw new AppError("Erro ao processar a solicitação.");
  }
};
