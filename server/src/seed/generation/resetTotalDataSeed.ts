import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/content/content.entity';
import { Person } from 'src/person/person.entity';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/user/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>,
    @InjectRepository(Content) private contentRepository: Repository<Content>
  ) { }

  async seed(): Promise<void> {
    const repositories = [
      this.contentRepository,
      this.portfolioRepository,
      this.roleRepository,
      this.userRepository,
      this.personRepository
    ];

    try {
      for (const repository of repositories) {
        const items = await repository.find();
        for (const item of items) {
          //@ts-ignore
          await repository.remove(item);
        }
      }
    } catch (error) {
      console.error('Помилка під час видалення записів:', error);
      throw error;
    }
  }
}
