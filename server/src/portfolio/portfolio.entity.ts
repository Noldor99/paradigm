import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subDescription: string;

  @Column()
  description: string;

  @Column()
  portfolioImg: string;

  @OneToMany(() => LinkPortfolio, link => link.portfolio, { nullable: true })
  links: LinkPortfolio[];

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity('linkPortfolio')
export class LinkPortfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Portfolio, portfolio => portfolio.links, { onDelete: 'CASCADE' })
  portfolio: Portfolio;
}
