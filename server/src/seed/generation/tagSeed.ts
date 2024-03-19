import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/tag/tag.entity';
import { SeederInterface } from '../seeder.interface';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { TagVariant } from 'src/tag/type';

@Injectable()
export class TagSeed implements SeederInterface {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) { }

  async seed() {
    // await this.tagRepository.clear();

    for (let i = 50; i > 0; i--) {
      const tagvariant =
        i % 3 === 0
          ? TagVariant.company
          : i % 3 === 1
            ? TagVariant.location
            : TagVariant.role;

      const tagSeed: CreateTagDto = {
        name: `tag${i}`,
        variant: tagvariant,
      };

      await new Promise(resolve => setTimeout(resolve, 10));

      await this.tagRepository.save(tagSeed);
    }
  }
}
