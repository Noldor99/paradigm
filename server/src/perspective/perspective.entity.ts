import { Tag } from 'src/tag/tag.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('perspective')
export class Perspective {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  perspectiveImg: string;

  @ManyToMany(() => Tag, (tag) => tag.perspectives)
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
