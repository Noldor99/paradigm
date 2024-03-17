import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactDto {
  @ApiProperty({
    example: 'info@paradigm.xyz',
    description: 'Email for general information',
  })
  @IsString()
  readonly information: string;

  @ApiProperty({
    example: 'press@paradigm.xyz',
    description: 'Email for press inquiries',
  })
  @IsString()
  readonly pressInquiries: string;

  @ApiProperty({
    example: 'investor@paradigm.xyz',
    description: 'Email for investor inquiries',
  })
  @IsString()
  readonly investorInquiries: string;

  @ApiProperty({
    example: 'linkedin.com/company/paradigm',
    description: 'LinkedIn profile link',
  })
  @IsString()
  readonly linkedin: string;

  @ApiProperty({
    example: 'twitter.xyz',
    description: 'twitter website link',
  })
  @IsString()
  readonly twitter: string;

}

export class CreateGeneralDto {
  @ApiProperty({ type: () => CreateContactDto })
  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsObject()
  @ValidateNested()
  readonly contact: CreateContactDto;

  @ApiProperty({
    example: 'Official Website',
    description: "The contact's description",
  })
  @IsString()
  readonly aboutLexical: string;

  @ApiProperty({
    example: 'Official Website',
    description: "The contact's description",
  })
  @IsString()
  readonly websiteTerms: string;

  @ApiProperty({
    example: 'Official Website',
    description: "The contact's description",
  })
  @IsString()
  readonly importantDisclosures: string;

  @ApiProperty({
    example: 'Official Website',
    description: "The contact's description",
  })
  @IsString()
  readonly privacyPolicy: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image',
    required: false,
  })
  readonly generalImg: any
}
