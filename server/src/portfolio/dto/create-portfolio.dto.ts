import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { IsUnique } from 'src/validation/is-unique';


export class CreateLinkDto {
  @ApiProperty({
    example: 'Official Website',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly name: string;

  @ApiProperty({
    example: 'http://example.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly link: string;


  readonly id?: string
}

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'Simple Title',
  })
  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'portfolio', column: 'title' })
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly title: string;

  @ApiProperty({
    example: 'Simple Description',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly subDescription: string;

  @ApiProperty({
    example: 'Simple Description',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image',
    required: false,
  })
  readonly portfolioImg: any

  @ApiProperty({
    example: [
      { link: 'http://example.com', name: 'Official Website' },
      { link: 'http://example.com', name: 'Official Website' },
    ],
    type: CreateLinkDto,
    isArray: false,
  })
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  readonly links: CreateLinkDto[] | string;
}
