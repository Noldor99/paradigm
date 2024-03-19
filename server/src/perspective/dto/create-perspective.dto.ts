import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from 'src/validation/is-unique';
import { Transform } from 'class-transformer';

export class CreatePerspectiveDto {
  @ApiProperty({
    example: 'Amber',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @IsUnique({ tableName: 'perspective', column: 'title' })
  readonly title: string;

  @ApiProperty({
    example: 'Amber helps clients access liquidity, earn yield, and manage risk across crypto-assets.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly description: string;

  @ApiProperty({
    example: [
      { name: 'tag1' },
      { name: 'tag2' },
    ],
    isArray: false,
  })
  @Transform(({ value }) => JSON.parse(value))
  readonly tags: any | string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image',
    required: false,
  })
  readonly perspectiveImg: any
}
