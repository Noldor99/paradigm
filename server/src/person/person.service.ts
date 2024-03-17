import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LinkPerson, Person } from "./person.entity"
import { Repository } from "typeorm"
import { CreatePersonDto } from "./dto/create-person.dto"
import { QueryPersonParamsDto } from "./dto/query-person-params.dto"
import { UpdatePersonDto } from "./dto/update-person.dto"
import { FileType, FilesService } from "src/files/files.service"
import { UserService } from "src/user/user.service"
import { validUuidRegex } from "src/validation/const-valid"

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private fileService: FilesService,
    @InjectRepository(LinkPerson)
    private linkRepository: Repository<LinkPerson>,
    private userService: UserService,
  ) { }


  async create(dto: CreatePersonDto, img): Promise<Person> {

    const user = await this.userService.getUserById(dto.userId);
    let savedLinks = null

    if (dto.links) {
      //@ts-ignore
      const contactParse = JSON.parse(dto.links)
      const link = this.linkRepository.create(contactParse);
      savedLinks = await this.linkRepository.save(link);
    }

    let picturePath = null
    if (img) {
      picturePath = await this.fileService.createPostImage(
        FileType.PERSON,
        img,
      )
    }

    const person = this.personRepository.create({
      ...dto,
      personImg: picturePath,
      links: savedLinks,
      user: user,
    });
    return await this.personRepository.save(person);
  }

  async getAll(dto: QueryPersonParamsDto) {
    const { page = 1, limit = 4 } = dto;
    try {
      const [persons, totalCount] = await this.personRepository.findAndCount({
        relations: {},
        order: {
          createdAt: 'DESC',
        },
        take: +limit,
        skip: (+page - 1) * +limit,
      });

      return { totalCount, persons };
    } catch (e) {
      return { totalCount: 0, persons: [] }
    }
  }

  async findOne(id: string): Promise<Person> {

    if (!validUuidRegex.test(id)) {
      const person = await this.personRepository.findOne({
        where: { router: id },
        relations: ['user.contents', 'user.portfolios']
      })
      if (person) return person
    }

    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['user.contents', 'user.portfolios']
    })
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`)
    }

    return person
  }

  async editPerson(personId: string, dto: UpdatePersonDto, img) {
    const person = await this.findOne(personId);

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "personImg" && key !== "links") {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    Object.assign(person, dtoFilter);

    const urlProjestsImg = person.personImg

    let picturePath = null

    if (img) {
      picturePath = await this.fileService.updatePostImage(
        urlProjestsImg,
        FileType.PERSON,
        img,
      )
      person.personImg = picturePath
    }

    if (dto.links) {
      //@ts-ignore
      const links = JSON.parse(dto.links);
      const existingLinks = person.links || [];

      const linksToCreate = links.filter(linkDto => !existingLinks.some(existingLink => existingLink.id === linkDto.id));
      const linksToUpdate = links.filter(linkDto => existingLinks.some(existingLink => existingLink.id === linkDto.id));
      const linksToDelete = existingLinks.filter(existingLink => !links.some(linkDto => linkDto.id === existingLink.id));

      await Promise.all(linksToDelete.map(async (linkToDelete) => {
        await this.linkRepository.remove(linkToDelete);
      }));

      const updatedLinks = await Promise.all(linksToUpdate.map(async (linkDto) => {
        const link = existingLinks.find((existingLink) => existingLink.id === linkDto.id) || new LinkPerson();
        Object.assign(link, linkDto);
        return this.linkRepository.save(link);
      }));

      const createdLinks = await Promise.all(linksToCreate.map(async (linkDto) => {
        const newLink = new LinkPerson();
        Object.assign(newLink, linkDto);
        return this.linkRepository.save(newLink);
      }));

      const allLinks = [...updatedLinks, ...createdLinks];

      person.links = allLinks;
    }

    const updatedPerson = await this.personRepository.save(person);
    return updatedPerson;
  }


  async remove(id: string) {
    const person = await this.findOne(id);
    return this.personRepository.remove(person);
  }

}
