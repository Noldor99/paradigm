import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/content/content.entity';
import { Feedback } from 'src/feedback/feedback.entity';
import { Contact, General } from 'src/general/general.entity';
import { Person } from 'src/person/person.entity';
import { Perspective } from 'src/perspective/perspective.entity';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Role } from 'src/roles/role.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(Feedback) private feedbackRepository: Repository<Feedback>,
    @InjectRepository(General) private generalRepository: Repository<General>,
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>,
    @InjectRepository(Content) private contentRepository: Repository<Content>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Perspective) private perspectiveRepository: Repository<Perspective>,
  ) { }

  async seed(): Promise<void> {
    const repositories = [
      this.feedbackRepository,
      this.generalRepository,
      this.contactRepository,
      this.contentRepository,
      this.portfolioRepository,
      this.roleRepository,
      this.userRepository,
      this.personRepository,
      this.tagRepository,
      this.perspectiveRepository,
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
