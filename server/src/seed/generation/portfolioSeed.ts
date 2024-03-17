import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreatePortfolioDto } from 'src/portfolio/dto/create-portfolio.dto';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PortfolioSeed implements SeederInterface {
  constructor(
    private readonly userService: UserService,
    private readonly portfolioService: PortfolioService,
  ) { }

  async seed() {

    const user = await this.userService.getUserByUsername('admin')

    for (let i = 50; i > 0; i--) {
      const portfolioImg =
        i % 3 === 0
          ? 'https://loremflickr.com/600/200/cat'
          : i % 3 === 1
            ? 'https://loremflickr.com/600/300/cat'
            : 'https://loremflickr.com/400/300/cat';

      const portfolioSeed: CreatePortfolioDto = {
        title: `Simple Title ${i}`,
        description: `Simple Description ${i}`,
        portfolioImg,
        links: JSON.stringify(
          [
            { link: 'http://example.com', name: 'Official Website' },
            { link: 'http://example.com', name: 'Official Website' },
          ]
        ),
        subDescription: `Simple subDescription ${i}`,
      };


      await new Promise(resolve => setTimeout(resolve, 10));
      await this.portfolioService.create(user.id, portfolioSeed, portfolioImg)
    }
  }
}
