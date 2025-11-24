import { IsUUID, IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateTabunganDto {
  @IsUUID()
  @IsNotEmpty()
  id_anggota: string;

  @IsUUID()
  @IsNotEmpty()
  id_kategori_simpanan: string;

  @IsDateString()
  @IsNotEmpty()
  tanggal: string;

  @IsNotEmpty()
  jumlah: number;

  @IsOptional()
  note?: string;
}
