import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from 'src/feedback/feedback.entity';
import { SeederInterface } from '../seeder.interface';
import { CreateFeedbackDto } from 'src/feedback/dto/create-feedback.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class FeedbackSeed implements SeederInterface {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) { }

  async seed() {
    // await this.feedbackRepository.clear();

    for (let i = 50; i > 0; i--) {

      const feedbackSeed: CreateFeedbackDto = {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        email: faker.internet.email(),
      };

      await new Promise(resolve => setTimeout(resolve, 10));

      await this.feedbackRepository.save(feedbackSeed);
    }
  }
}
