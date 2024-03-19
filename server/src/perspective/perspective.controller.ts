import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PerspectiveService } from './perspective.service';
import { CreatePerspectiveDto } from './dto/create-perspective.dto';
import { UpdatePerspectiveDto } from './dto/update-perspective.dto';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryPerspectiveParamsDto } from './dto/query-perspective-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from 'src/files/files.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('perspective')
@Controller('perspective')
export class PerspectiveController {
  constructor(private readonly perspectiveService: PerspectiveService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.PERSPECTIVE))
  create(@Body() createPerspectiveDto: CreatePerspectiveDto,
    @UploadedFile() img) {
    return this.perspectiveService.create(createPerspectiveDto, img);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({ name: 'tags', type: String, required: false, example: 'tag1,tag2' })
  @ApiQuery({ name: 'search', type: String, required: false })
  getAll(@Query() params: QueryPerspectiveParamsDto) {
    return this.perspectiveService.getAll(params);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the perspective' })
  getOne(@Param('id') id: string) {
    return this.perspectiveService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.PERSPECTIVE))
  async update(
    @Param('id') perspectiveId: string,
    @Body() updatePerspectiveDto: UpdatePerspectiveDto,
    @UploadedFile() img
  ) {
    return await this.perspectiveService.editPerspective(perspectiveId, updatePerspectiveDto, img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perspectiveService.remove(id);
  }
}
