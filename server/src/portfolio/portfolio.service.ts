import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LinkPortfolio, Portfolio } from "./portfolio.entity"
import { Repository } from "typeorm"
import { CreatePortfolioDto } from "./dto/create-portfolio.dto"
import { QueryPortfolioParamsDto } from "./dto/query-portfolio-params.dto"
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto"
import { FileType, FilesService } from "src/files/files.service"
import { UserService } from "src/user/user.service"

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private fileService: FilesService,
    @InjectRepository(LinkPortfolio)
    private linkRepository: Repository<LinkPortfolio>,
    private userService: UserService,
  ) { }


  async create(userId, dto: CreatePortfolioDto, img): Promise<Portfolio> {

    const user = await this.userService.getUserById(userId);

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
        FileType.PORTFOLIO,
        img,
      )
    }

    const portfolio = this.portfolioRepository.create({
      ...dto,
      portfolioImg: picturePath,
      links: savedLinks,
      user: user,
    });
    return await this.portfolioRepository.save(portfolio);
  }

  async getAll(dto: QueryPortfolioParamsDto) {
    const { page = 1, limit = 4, personRouter } = dto;
    try {
      let queryBuilder = this.portfolioRepository.createQueryBuilder('portfolio')
        .orderBy('portfolio.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (personRouter) {
        queryBuilder = queryBuilder
          .leftJoin('portfolio.user', 'user')
          .leftJoin('user.person', 'person')
          .andWhere('person.router = :personRouter', { personRouter });
      }

      const [portfolios, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, portfolios };
    } catch (e) {
      return { totalCount: 0, portfolios: [] };
    }
  }


  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: { links: true },
    })

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`)
    }

    return portfolio
  }

  async editPortfolio(portfolioId: string, dto: UpdatePortfolioDto, img) {
    const portfolio = await this.findOne(portfolioId);

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "portfolioImg" && key !== "links") {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    Object.assign(portfolio, dtoFilter);

    const urlProjestsImg = portfolio.portfolioImg

    let picturePath = null

    if (img) {
      picturePath = await this.fileService.updatePostImage(
        urlProjestsImg,
        FileType.PORTFOLIO,
        img,
      )
      portfolio.portfolioImg = picturePath
    }

    if (dto.links) {
      //@ts-ignore
      const links = JSON.parse(dto.links);
      const existingLinks = portfolio.links || [];

      const linksToCreate = links.filter(linkDto => !existingLinks.some(existingLink => existingLink.id === linkDto.id));
      const linksToUpdate = links.filter(linkDto => existingLinks.some(existingLink => existingLink.id === linkDto.id));
      const linksToDelete = existingLinks.filter(existingLink => !links.some(linkDto => linkDto.id === existingLink.id));

      await Promise.all(linksToDelete.map(async (linkToDelete) => {
        await this.linkRepository.remove(linkToDelete);
      }));

      const updatedLinks = await Promise.all(linksToUpdate.map(async (linkDto) => {
        const link = existingLinks.find((existingLink) => existingLink.id === linkDto.id) || new LinkPortfolio();
        Object.assign(link, linkDto);
        return this.linkRepository.save(link);
      }));

      const createdLinks = await Promise.all(linksToCreate.map(async (linkDto) => {
        const newLink = new LinkPortfolio();
        Object.assign(newLink, linkDto);
        return this.linkRepository.save(newLink);
      }));

      const allLinks = [...updatedLinks, ...createdLinks];

      portfolio.links = allLinks;
    }


    const updatedPortfolio = await this.portfolioRepository.save(portfolio);
    return updatedPortfolio;
  }


  async remove(id: string) {
    const portfolio = await this.findOne(id);
    return this.portfolioRepository.remove(portfolio);
  }

}
