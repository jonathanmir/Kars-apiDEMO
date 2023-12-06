import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entitiy";
import { Image } from "./images.entitiy";
import { nullable } from "zod";
import { Comment } from "./comment.entity";

export enum fuelType {
  Gasoline = 1,
  Ethanol = 2,
  Flex = 3,
}

@Entity("Announcement")
class Announcement {
  @PrimaryColumn("uuid")
  id: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  brand: string;
  @Column({ type: "varchar", length: 100, nullable: false })
  model: string;
  @Column({ type: "varchar", length: 4, nullable: false })
  year: string;
  @Column({ type: "enum", enum: fuelType, nullable: false })
  fuelType: fuelType;
  @Column({ type: "varchar", length: 20, nullable: false })
  mileage: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  color: string;
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  fipePrice: number;
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  sellPrice: number | string;
  @Column({ type: "text", nullable: false })
  description: string;
  @Column({ type: "text", nullable: false })
  coverImage: string;
  @Column({ type: "boolean", default: true })
  isActive: boolean;
  @OneToMany(() => Image, (image) => image.announcement, { nullable: true })
  images?: Image[];

  @ManyToOne(() => User, (user) => user.announcement, { nullable: false })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.announcement, {
    nullable: true,
  })
  comments?: Comment[];

  constructor() {
    this.id = uuid();
  }
}

export { Announcement };
