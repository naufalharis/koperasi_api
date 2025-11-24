import { IsNotEmpty } from 'class-validator';

export class CreateKategoriSimpananDto {
  @IsNotEmpty()
  nama: string;
}
