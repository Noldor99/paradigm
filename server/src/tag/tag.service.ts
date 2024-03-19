import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Tag } from "./tag.entity"
import { Repository } from "typeorm"
import { CreateTagDto } from "./dto/create-tag.dto"
import { QueryTagParamsDto } from "./dto/query-tag-params.dto"
import { UpdateTagDto } from "./dto/update-tag.dto"

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) { }


  async create(dto: CreateTagDto): Promise<Tag> {
    console.log(dto)
    const tag = this.tagRepository.create(dto);
    return await this.tagRepository.save(tag);
  }

  async getAll(dto: QueryTagParamsDto) {
    const { page = 1, limit = 400, variant, search } = dto;
    try {
      let queryBuilder = this.tagRepository.createQueryBuilder('tag')
        .orderBy('tag.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (variant) {
        queryBuilder = queryBuilder.where('tag.variant = :variant', { variant });
      }

      if (search) {
        queryBuilder = queryBuilder
          .where(
            '(tag.name LIKE :search)',
            { search: `%${search}%` });
      }

      const [tags, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, tags };
    } catch (e) {
      return { totalCount: 0, tags: [] };
    }
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`)
    }

    return tag
  }


  async getByValue(value: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name: value } });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  async increaseCount(value: string): Promise<Tag> {
    const tag = await this.getByValue(value);
    tag.countUse = tag.countUse + 1
    return this.tagRepository.save(tag);
  }

  async decreaseCount(value: string): Promise<Tag> {
    const tag = await this.getByValue(value);
    tag.countUse = tag.countUse - 1
    return this.tagRepository.save(tag);
  }

  async editTag(tagId: string, dto: UpdateTagDto) {
    const tag = await this.findOne(tagId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(tag, dtoFilter);

    return this.tagRepository.save(tag);

  }


  async remove(id: string) {
    const tag = await this.findOne(id);
    return this.tagRepository.remove(tag)
  }

}
