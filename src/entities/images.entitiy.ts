import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./annoucement.entity";

@Entity()
class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", nullable: true })
  url: string;
  @ManyToOne(() => Announcement, (announcement) => announcement.images)
  announcement: Announcement;
}

export { Image };
