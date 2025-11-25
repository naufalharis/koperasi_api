import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePenarikanDto {
  @IsNotEmpty()
  @IsUUID()
  id_anggota: string;

  @IsNotEmpty()
  @IsUUID()
  id_tabungan: string;

  @IsNotEmpty()
  @Type(() => Date)
  tanggal: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  jumlah: number;
}
