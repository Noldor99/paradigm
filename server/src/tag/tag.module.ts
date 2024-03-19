import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from 'src/validation/is-unique-constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService, IsUniqueConstraint],
  exports: [TagService],
})
export class TagModule { }
