import { Repository } from "typeorm";
import { Comment } from "../../entities";
import { AppDataSource } from "../../data-source";

export const deleteCommentService = async (id: string) => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);
  await commentRepository.delete({ id: id });
  return;
};
