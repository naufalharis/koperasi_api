// src/kas-koperasi/dto/kas-query.dto.ts
import { IsOptional, IsInt, Min, IsDateString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class KasQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage?: number = 20;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  // nominal filters (float numbers) - transform ke Number di controller/service atau gunakan Type
  @IsOptional()
  @Type(() => Number)
  min?: number;

  @IsOptional()
  @Type(() => Number)
  max?: number;

  @IsOptional()
  @IsIn(['tanggal', 'nominal', 'created_at'])
  sort?: 'tanggal' | 'nominal' | 'created_at' = 'tanggal';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
