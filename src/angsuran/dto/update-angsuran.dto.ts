import { PartialType } from '@nestjs/mapped-types';
import { CreateAngsuranDto } from './create-angsuran.dto';

export class UpdateAngsuranDto extends PartialType(CreateAngsuranDto) {}
