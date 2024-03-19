import { Injectable, Logger } from '@nestjs/common'
import { Promise as Bluebird } from 'bluebird'
import { SeederInterface } from './seeder.interface'
import { RoleSeeder } from './generation/roleSeeder'
import { UserSeed } from './generation/userSeed'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed'
import { PersonSeed } from './generation/personSeed'
import { PortfolioSeed } from './generation/portfolioSeed'
import { GeneralSeeder } from './generation/generalSeed'
import { ContentSeed } from './generation/contentSeed'
import { FeedbackSeed } from './generation/feedbackSeed'
import { PerspectiveSeed } from './generation/perspectiveSeed'
import { TagSeed } from './generation/tagSeed'

const isProdaction = process.env.NODE_ENV === 'prodaction'

@Injectable()
export class SeedService {
  private readonly seeders = []
  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly resetTotalDataSeed: ResetTotalDataSeed,
    private readonly userSeed: UserSeed,
    private readonly roleSeed: RoleSeeder,
    private readonly personSeed: PersonSeed,
    private readonly portfolioSeed: PortfolioSeed,
    private readonly generalSeed: GeneralSeeder,
    private readonly contentSeed: ContentSeed,
    private readonly feedbackSeed: FeedbackSeed,
    private readonly tagSeed: TagSeed,
    private readonly perspectiveSeed: PerspectiveSeed,


  ) {
    this.seeders = isProdaction
      ? [
        this.resetTotalDataSeed,
        this.roleSeed,
        this.userSeed,
        this.personSeed,
        this.portfolioSeed,
        this.generalSeed,
        this.generalSeed,
        this.contentSeed,
        this.feedbackSeed,
        this.tagSeed,
        this.perspectiveSeed,


      ]
      : [
        this.resetTotalDataSeed,
        this.roleSeed,
        this.userSeed,
        this.personSeed,
        this.portfolioSeed,
        this.generalSeed,
        this.generalSeed,
        this.contentSeed,
        this.feedbackSeed,
        this.tagSeed,
        this.perspectiveSeed,

      ]
  }

  async seed() {
    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`)
      await seeder.seed()
    })
  }
}
