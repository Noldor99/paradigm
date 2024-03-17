
import { Content } from "src/content/content.entity";
import { Person } from "src/person/person.entity";
import { Portfolio } from "src/portfolio/portfolio.entity";
import { Role } from "src/roles/role.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"


@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  userImg?: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  @JoinColumn({ name: 'userId' })
  portfolios: Portfolio[];

  @OneToMany(() => Content, (content) => content.user)
  @JoinColumn({ name: 'userId' })
  contents: Content[];

  @OneToOne(() => Person, (person) => person.user)
  @JoinColumn()
  person: Person;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
