import {
  Controller,
  Get,
  Body,
  Delete,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GeneralService } from './general.service';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReturnType } from './general';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from 'src/files/files.service';

@ApiTags('general')
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) { }

  @ApiQuery({
    name: 'returnType',
    required: false,
    type: String,
    enum: Object.values(ReturnType),
  })
  @Get('param')
  async getGeneralData(
    @Query('returnType') returnType: ReturnType = ReturnType.GENERAL,
  ) {
    return this.generalService.getGeneralData(returnType);
  }

  @Get()
  getOne() {
    return this.generalService.findOne();
  }

  @Patch()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.GENERAL))
  async update(
    @Body() updateGeneralDto: UpdateGeneralDto,
    @UploadedFile() generalImg
  ) {
    return this.generalService.editGeneral(updateGeneralDto, generalImg);
  }

  @Delete()
  remove() {
    return this.generalService.remove();
  }
}
