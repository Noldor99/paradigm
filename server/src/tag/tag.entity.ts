import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagVariant } from './type';
import { Perspective } from 'src/perspective/perspective.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  countUse: number;

  @Column({ type: 'enum', enum: TagVariant })
  variant: TagVariant;

  @ManyToMany(() => Perspective, (perspective) => perspective.tags)
  perspectives: Perspective[];

  @CreateDateColumn()
  createdAt: Date
}
