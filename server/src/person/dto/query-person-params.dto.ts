import { IsOptional } from 'class-validator';

export class QueryPersonParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}
