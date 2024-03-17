import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  router: string;

  @Column()
  fullName: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @Column()
  personImg: string;

  @OneToMany(() => LinkPerson, link => link.person, { nullable: true, eager: true })
  links: LinkPerson[];

  @OneToOne(() => User, (user) => user.person)
  user: User;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity('linkPerson')
export class LinkPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Person, person => person.links, { onDelete: 'CASCADE' })
  person: Person;
}
