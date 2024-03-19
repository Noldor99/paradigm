import { IsOptional } from 'class-validator';

export class QueryPerspectiveParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  tags?: string;

  @IsOptional()
  search?: string;

  @IsOptional()
  usedtags?: boolean;
}
