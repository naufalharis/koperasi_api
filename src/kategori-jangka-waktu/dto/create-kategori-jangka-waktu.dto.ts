import { IsString, IsNotEmpty } from 'class-validator';

export class CreateKategoriJangkaWaktuDto {
  @IsString()
  @IsNotEmpty()
  nama: string;
}
