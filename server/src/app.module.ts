import { Module } from '@nestjs/common'
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { DatabaseModule } from "./database/database.module";
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CookiesMiddleware } from './auth/cookies.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PersonModule } from "./person/person.module";
import { FilesModule } from './files/files.module';
import { GeneralModule } from './general/general.module';
import { ContentModule } from './content/content.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PerspectiveModule } from './perspective/perspective.module';
import { TagModule } from './tag/tag.module';




@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/api',
      rootPath: path.resolve(__dirname, 'static'),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get('ACCESS_TOKEN_SECRET') ||
          'your_access_token_secret_value_web3',
        signOptions: {
          expiresIn: configService.get('ACCESS_TOKEN_EXPIRES_IN') || '36000s',
        },
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RolesModule,
    PersonModule,
    FilesModule,
    GeneralModule,
    ContentModule,
    PortfolioModule,
    FeedbackModule,
    PerspectiveModule,
    TagModule,
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookiesMiddleware).forRoutes('*')
  }
}