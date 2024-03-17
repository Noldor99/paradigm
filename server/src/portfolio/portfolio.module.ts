import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { LinkPortfolio, Portfolio } from './portfolio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { IsUniqueConstraint } from 'src/validation/is-unique-constraint';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio, LinkPortfolio]),
    FilesModule,
    UserModule
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, IsUniqueConstraint],
  exports: [PortfolioService],
})
export class PortfolioModule { }
