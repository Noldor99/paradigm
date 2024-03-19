import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseInterceptors,
  Req,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryPortfolioParamsDto } from './dto/query-portfolio-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from 'src/files/files.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor(FileType.PORTFOLIO))
  create(
    @Req() req,
    @Body() createPortfolioDto: CreatePortfolioDto,
    @UploadedFile() img
  ) {
    return this.portfolioService.create(req.user.id, createPortfolioDto, img);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({ name: 'personRouter', type: String, required: false })
  getAll(@Query() params: QueryPortfolioParamsDto) {
    return this.portfolioService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the portfolio' })
  getOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.PORTFOLIO))
  async update(
    @Param('id') portfolioId: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @UploadedFile() img
  ) {
    return await this.portfolioService.editPortfolio(portfolioId, updatePortfolioDto, img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}
