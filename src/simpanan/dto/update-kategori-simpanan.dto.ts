import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriSimpananDto } from './create-kategori-simpanan.dto';

export class UpdateKategoriSimpananDto extends PartialType(CreateKategoriSimpananDto) {}
