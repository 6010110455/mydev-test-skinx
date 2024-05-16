import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  postedAt: Date;

  @Column()
  postedBy: string;

  @Column("simple-array")
  tags: string[];
}
