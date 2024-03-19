import { Module } from '@nestjs/common';
import { PerspectiveService } from './perspective.service';
import { PerspectiveController } from './perspective.controller';
import { Perspective } from './perspective.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from 'src/tag/tag.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Perspective]),
    TagModule, FilesModule
  ],
  controllers: [PerspectiveController],
  providers: [PerspectiveService],
  exports: [PerspectiveService],
})
export class PerspectiveModule { }
