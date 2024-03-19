import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { TagVariant } from '../type';
import { IsUnique } from 'src/validation/is-unique';

export class CreateTagDto {
  @ApiProperty({
    example: 'tag1',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @IsUnique({ tableName: 'tag', column: 'name' })
  readonly name: string;

  @ApiProperty({
    example: 'location',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(TagVariant))
  readonly variant: TagVariant;
}
