import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { PersonService } from 'src/person/person.service';
import { UserService } from 'src/user/user.service';
import { faker } from '@faker-js/faker'

@Injectable()
export class PersonSeed implements SeederInterface {
  constructor(
    private readonly userService: UserService,
    private readonly personService: PersonService,
  ) { }

  async seed() {

    const users = await this.userService.getAll({ limit: '200', page: '1' })

    for (let i = users.totalCount; i > 0; i--) {
      const personImg =
        i % 3 === 0
          ? 'https://loremflickr.com/600/200/cat'
          : i % 3 === 1
            ? 'https://loremflickr.com/600/300/cat'
            : 'https://loremflickr.com/400/300/cat';

      const personSeed: CreatePersonDto = {
        userId: users.users[i - 1].id,
        router: faker.helpers.slugify(faker.person.fullName().toLowerCase()),
        fullName: faker.person.fullName(),
        position: faker.person.jobType(),
        description: faker.person.jobDescriptor(),
        personImg,
        //@ts-ignore
        links: JSON.stringify(
          [
            { link: 'http://example.com', name: 'Website' },
            { link: 'http://example.com', name: 'Website' },
          ]
        ),
      };


      await new Promise(resolve => setTimeout(resolve, 10));
      await this.personService.create(personSeed, personImg)
    }
  }
}
