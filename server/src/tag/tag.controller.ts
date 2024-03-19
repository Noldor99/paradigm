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
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryTagParamsDto } from './dto/query-tag-params.dto';
import { TagVariant } from './type';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTagDto: CreateTagDto) {
    console.log(createTagDto)
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({
    name: 'variant',
    required: false,
    type: String,
    enum: TagVariant,
  })
  @ApiQuery({ name: 'search', type: String, required: false })
  getAll(@Query() params: QueryTagParamsDto) {
    return this.tagService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the tag' })
  getOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') tagId: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return await this.tagService.editTag(tagId, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
