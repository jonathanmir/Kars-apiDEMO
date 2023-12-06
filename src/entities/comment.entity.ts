import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Announcement } from "./annoucement.entity";
import { User } from "./user.entitiy";
import { v4 as uuid } from "uuid";

@Entity("")
class Comment {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  announcement: Announcement;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  constructor() {
    this.id = uuid();
  }
}

export { Comment };
