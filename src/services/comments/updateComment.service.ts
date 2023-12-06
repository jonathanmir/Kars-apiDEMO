import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import { AppError } from "../../errors";

export const updateCommentService = async (data: any, id: string) => {
  const commentRepo: Repository<Comment> = AppDataSource.getRepository(Comment);

  const oldCommentData = await commentRepo.findOneBy({
    id: id,
  });

  if (!oldCommentData) {
    throw new AppError("Comment not found", 404);
  }

  const comment = commentRepo.create({
    ...oldCommentData,
    ...data,
  });

  await commentRepo.save(comment);

  return comment;
};
