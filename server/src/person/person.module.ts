import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { LinkPerson, Person } from './person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { IsUniqueConstraint } from 'src/validation/is-unique-constraint';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, LinkPerson]),
    FilesModule,
    UserModule
  ],
  controllers: [PersonController],
  providers: [PersonService, IsUniqueConstraint],
  exports: [PersonService],
})
export class PersonModule { }
