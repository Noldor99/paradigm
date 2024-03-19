import { IsOptional } from 'class-validator';

export class QueryFeedbackParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}
