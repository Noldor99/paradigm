import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Amber',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly title: string;

  @ApiProperty({
    example: 'Amber helps clients access liquidity, earn yield, and manage risk across crypto-assets.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly description: string;

  @ApiProperty({
    example: 'qwerr@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly email: string;
}
