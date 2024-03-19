import { IsOptional } from 'class-validator';
import { TagVariant } from '../type';

export class QueryTagParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  variant?: TagVariant;

  @IsOptional()
  search?: string;
}
