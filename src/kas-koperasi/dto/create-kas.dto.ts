// src/kas-koperasi/dto/create-kas.dto.ts
import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';


export class CreateKasDto {
@IsNumber()
nominal: number;


@IsDateString()
tanggal: string; // ISO date string


@IsOptional()
@IsNotEmpty()
note?: string;
}