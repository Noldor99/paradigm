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


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature(
      [Role, User, Person, General, Contact, Portfolio, Content]
    ),
    UserModule,
    AuthModule,
    RolesModule,
    PersonModule,
    GeneralModule,
    PortfolioModule,
    GeneralModule,
    ContentModule,

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
  ],
  exports: [SeedService]

})
export class SeedModule { }
