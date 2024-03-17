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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryPersonParamsDto } from './dto/query-person-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from 'src/files/files.service';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.PERSON))
  create(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() img
  ) {
    return this.personService.create(createPersonDto, img);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  getAll(@Query() params: QueryPersonParamsDto) {
    return this.personService.getAll(params);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the person' })
  getOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.PERSON))
  async update(
    @Param('id') personId: string,
    @Body() updatePersonDto: UpdatePersonDto,
    @UploadedFile() img
  ) {
    return await this.personService.editPerson(personId, updatePersonDto, img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
