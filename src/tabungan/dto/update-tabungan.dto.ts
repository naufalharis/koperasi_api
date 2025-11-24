import { PartialType } from '@nestjs/mapped-types';
import { CreateTabunganDto } from './create-tabungan.dto';

export class UpdateTabunganDto extends PartialType(CreateTabunganDto) {}
