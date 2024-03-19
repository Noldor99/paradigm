import { PartialType } from '@nestjs/swagger';
import { CreatePerspectiveDto } from './create-perspective.dto';

export class UpdatePerspectiveDto extends PartialType(CreatePerspectiveDto) { }
