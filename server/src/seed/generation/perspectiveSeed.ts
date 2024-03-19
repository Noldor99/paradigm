import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreatePerspectiveDto } from 'src/perspective/dto/create-perspective.dto';
import { PerspectiveService } from 'src/perspective/perspective.service';

@Injectable()
export class PerspectiveSeed implements SeederInterface {
  constructor(
    private readonly perspectiveService: PerspectiveService,
  ) { }

  async seed() {


    for (let i = 50; i > 0; i--) {
      const perspectiveImg =
        i % 3 === 0
          ? 'https://loremflickr.com/600/200/cat'
          : i % 3 === 1
            ? 'https://loremflickr.com/600/300/cat'
            : 'https://loremflickr.com/400/300/cat';

      const perspectiveSeed: CreatePerspectiveDto = {
        title: `Simple Title ${i}`,
        description: `Simple Description ${i}`,
        perspectiveImg,
        tags: JSON.stringify([
          { name: 'tag1' },
          { name: 'tag2' },
        ])
      };


      await new Promise(resolve => setTimeout(resolve, 10));
      await this.perspectiveService.create(perspectiveSeed, perspectiveImg)
    }
  }
}
