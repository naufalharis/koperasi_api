import { PartialType } from '@nestjs/mapped-types';
import { CreatePenarikanDto } from './create-penarikan.dto';

export class UpdatePenarikanDto extends PartialType(CreatePenarikanDto) {}