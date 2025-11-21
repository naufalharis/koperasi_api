// src/kas-koperasi/dto/update-kas.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateKasDto } from './create-kas.dto';


export class UpdateKasDto extends PartialType(CreateKasDto) {}