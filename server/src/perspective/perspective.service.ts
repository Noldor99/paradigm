import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Perspective } from "./perspective.entity"
import { Repository } from "typeorm"
import { CreatePerspectiveDto } from "./dto/create-perspective.dto"
import { QueryPerspectiveParamsDto } from "./dto/query-perspective-params.dto"
import { UpdatePerspectiveDto } from "./dto/update-perspective.dto"
import { TagService } from "src/tag/tag.service"
import { FileType, FilesService } from "src/files/files.service"

@Injectable()
export class PerspectiveService {
  constructor(
    @InjectRepository(Perspective)
    private perspectiveRepository: Repository<Perspective>,
    private tagService: TagService,
    private fileService: FilesService,
  ) { }


  async create(dto: CreatePerspectiveDto, img): Promise<Perspective> {

    let picturePath = null
    if (img) {
      picturePath = await this.fileService.createPostImage(
        FileType.PERSPECTIVE,
        img,
      )
    }

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key] !== 'tags' && dto[key] !== 'perspectiveImg') {
        acc[key] = dto[key]
      };
      return acc;
    }, {});

    const perspective = this.perspectiveRepository.create({
      ...dtoFilter,
      perspectiveImg: picturePath,
    });

    if (dto.tags) {
      const tagsParse = JSON.parse(dto.tags)
      const tags = await Promise.all(tagsParse.map(tagValue => this.tagService.getByValue(tagValue.name)));
      await Promise.all(tagsParse.map(tagValue => this.tagService.increaseCount(tagValue.name)));
      perspective.tags = tags
    }
    return await this.perspectiveRepository.save(perspective);
  }

  async getAll(dto: QueryPerspectiveParamsDto) {
    const { page = 1, limit = 4, tags, search } = dto;
    try {
      let queryBuilder = this.perspectiveRepository.createQueryBuilder('perspective')
        .leftJoinAndSelect('perspective.tags', 'tags')
        .orderBy('perspective.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (tags) {
        const tagsArray = tags.split(',');
        queryBuilder = queryBuilder
          .leftJoin('perspective.tags', 'tag')
          .andWhere('tag.name IN (:...tagNames)', { tagNames: tagsArray })
      }

      if (search) {
        queryBuilder = queryBuilder
          .where(
            '(perspective.title LIKE :search)',
            { search: `%${search}%` });
      }

      const [perspectives, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, perspectives };
    } catch (e) {
      return { totalCount: 0, perspectives: [] };
    }
  }


  async findOne(id: string): Promise<Perspective> {
    const perspective = await this.perspectiveRepository.findOne({
      where: { id },
      relations: { tags: true },
    })

    if (!perspective) {
      throw new NotFoundException(`Perspective with ID ${id} not found`)
    }

    return perspective
  }

  async editPerspective(perspectiveId: string, dto: UpdatePerspectiveDto, img) {
    const perspective = await this.findOne(perspectiveId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "perspectiveImg" && key !== "tags") {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    Object.assign(perspective, dtoFilter);

    const urlPerspectiveImg = perspective.perspectiveImg

    let picturePath = null

    if (img) {
      picturePath = await this.fileService.updatePostImage(
        urlPerspectiveImg,
        FileType.PERSPECTIVE,
        img,
      )
      perspective.perspectiveImg = picturePath
    }


    if (dto.tags) {
      const tagsParse = JSON.parse(dto.tags)
      const tagValues = (perspective.tags);

      await Promise.all(tagValues.map(tagValue => this.tagService.decreaseCount(tagValue.name)));
      const tags = await Promise.all(tagsParse.map(tagValue => this.tagService.getByValue(tagValue.name)));

      await Promise.all(tagsParse.map(tagValue => this.tagService.increaseCount(tagValue.name)))
      perspective.tags = tags;
    }

    return this.perspectiveRepository.save(perspective);
  }


  async remove(id: string) {
    const perspective = await this.findOne(id);


    const tagValues = perspective.tags;
    await Promise.all(tagValues.map(tagValue => this.tagService.decreaseCount(tagValue.name)));

    return this.perspectiveRepository.remove(perspective)
  }

}
