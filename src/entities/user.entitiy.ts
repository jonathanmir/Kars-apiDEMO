import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Announcement } from "./annoucement.entity";
import { Comment } from './comment.entity';

enum accountType {
  buyer = "buyer",
  seller = "seller",
}

@Entity("User")
class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;
  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cpf: string;
  @Column({ type: "varchar", length: 11, nullable: false })
  telephone: string;
  @Column({ type: "date", nullable: false })
  birthdate: string;
  @Column({ type: "varchar", length: 250, nullable: true })
  description: string;
  @Column({ type: "varchar", length: 8, nullable: false })
  cep: string;
  @Column({ type: "varchar", length: 2, nullable: false })
  state: string;
  @Column({ type: "varchar", length: 30, nullable: false })
  city: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  street: string;
  @Column({ type: "varchar", nullable: false })
  number: string;
  @Column({ type: "varchar", nullable: true })
  resetToken: string | null;
  @Column({ type: "date", nullable: true })
  resetTokenExpiration: Date | null;
  @Column({
    type: "enum",
    enum: accountType,
    default: accountType.buyer,
    nullable: false,
  })
  accountType: accountType;
  @Column({ type: "varchar", length: 50, nullable: true })
  complement: string;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcement: Announcement;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Column({ length: 200 })
  password: string;
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
  constructor() {
    this.id = uuid();
  }
}

export { User };
