import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import { ICommentRequest, iCommentRepo } from "../../interfaces/comments.interfaces";

const createCommentService = async (commentData: ICommentRequest) => {
  const commentRepo: iCommentRepo = AppDataSource.getRepository(Comment);
  const comment = commentRepo.create(commentData as DeepPartial<Comment>);
  await commentRepo.save(comment);
  const newcomment = comment;
  return newcomment;
};

export { createCommentService };
