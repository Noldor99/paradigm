import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { RoleSeeder } from './generation/roleSeeder'
import { UserSeed } from './generation/userSeed'
import { RolesModule } from 'src/roles/roles.module'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed'
import { Role } from 'src/roles/role.entity'
import { User } from 'src/user/user.entity'
import { PersonModule } from 'src/person/person.module'
import { PersonSeed } from './generation/personSeed'
import { Person } from 'src/person/person.entity'
import { GeneralModule } from 'src/general/general.module'
import { Contact, General } from 'src/general/general.entity'
import { PortfolioModule } from 'src/portfolio/portfolio.module'
import { Portfolio } from 'src/portfolio/portfolio.entity'
import { PortfolioSeed } from './generation/portfolioSeed'
import { GeneralSeeder } from './generation/generalSeed'
import { Content } from 'src/content/content.entity'
import { ContentModule } from 'src/content/content.module'
import { ContentSeed } from './generation/contentSeed'
import { FeedbackModule } from 'src/feedback/feedback.module'
import { FeedbackSeed } from './generation/feedbackSeed'
import { Feedback } from 'src/feedback/feedback.entity'
import { Perspective } from 'src/perspective/perspective.entity'
import { Tag } from 'src/tag/tag.entity'
import { PerspectiveModule } from 'src/perspective/perspective.module'
import { TagModule } from 'src/tag/tag.module'
import { PerspectiveSeed } from './generation/perspectiveSeed'
import { TagSeed } from './generation/tagSeed'


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature(
      [Role, User, Person, General, Contact, Portfolio, Content, Feedback, Perspective, Tag]
    ),
    UserModule,
    AuthModule,
    RolesModule,
    PersonModule,
    GeneralModule,
    PortfolioModule,
    GeneralModule,
    ContentModule,
    FeedbackModule,
    PerspectiveModule,
    TagModule

  ],
  providers: [
    SeedService,
    RoleSeeder,
    UserSeed,
    PersonSeed,
    ResetTotalDataSeed,
    PortfolioSeed,
    GeneralSeeder,
    ContentSeed,
    FeedbackSeed,
    PerspectiveSeed,
    TagSeed
  ],
  exports: [SeedService]

})
export class SeedModule { }
