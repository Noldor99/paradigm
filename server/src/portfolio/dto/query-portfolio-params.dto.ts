import { IsOptional } from 'class-validator';

export class QueryPortfolioParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  personRouter?: string;
}
