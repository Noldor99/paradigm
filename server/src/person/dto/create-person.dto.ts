import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, Length, MinLength, ValidateNested } from 'class-validator';
import { IsUnique } from 'src/validation/is-unique';


export class CreateLinkDto {
  @ApiProperty({
    example: 'http://example.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @ApiProperty({
    example: 'Official Website',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly name: string;

  readonly id?: string
}

export class CreatePersonDto {
  @ApiProperty({
    example: 'id',
    required: false
  })
  @IsOptional()
  readonly userId: string;

  @ApiProperty({
    example: 'simple',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  @IsUnique({ tableName: 'person', column: 'router' })
  readonly router: string;

  @ApiProperty({
    example: 'Tony Coppola',
  })
  @IsNotEmpty()
  @IsUnique({ tableName: 'Person', column: 'fullName' })
  @IsString()
  @Length(3, 255, { message: 'fullName must be at least 3 characters long' })
  readonly fullName: string;

  @ApiProperty({
    example: 'Event Manager',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'must be least 3 - 255 characters long' })
  readonly position: string;


  @ApiProperty({
    example: 'Meet [Employee Name], our programming prodigy! With a knack for turning code into creative solutions, [Employee Name] is the driving force behind our innovative projects. Their expertise, collaborative spirit, and commitment to excellence make them an invaluable asset to our programming team.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Mustat least be 3 characters long' })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image',
    required: false,
  })
  readonly personImg: any

  @ApiProperty({
    example: [
      { link: 'http://example.com', name: 'Website' },
      { link: 'http://example.com', name: 'Website' },
    ],
    type: CreateLinkDto,
    isArray: false,
  })
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ValidateNested({ each: true })
  readonly links: CreateLinkDto[];
}
