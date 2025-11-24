import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriJangkaWaktuDto } from './create-kategori-jangka-waktu.dto';

export class UpdateKategoriJangkaWaktuDto extends PartialType(CreateKategoriJangkaWaktuDto) {}
