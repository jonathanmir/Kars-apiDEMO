import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";

const listCommentsByAnnouncementServices = async (announcementId: string) => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const comments = await commentRepo.find({
    where: { announcement: { id: announcementId } },
    relations: ["user"],
    order: { createdAt: "DESC" },
  });

  const commentsWithUser = await Promise.all(
    comments.map(async (comment) => {
      const user = comment.user;
      const userWithSelectedProperties = {
        id: user.id,
        name: user.name,
      };
      return { ...comment, user: userWithSelectedProperties };
    })
  );

  return commentsWithUser;
};

export { listCommentsByAnnouncementServices };
