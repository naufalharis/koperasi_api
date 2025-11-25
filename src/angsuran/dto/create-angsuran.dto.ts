import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateAngsuranDto {
  @IsNotEmpty()
  @IsUUID()
  pinjaman_id: string;

  @IsNotEmpty()
  tanggal_pembayaran: Date;

  @IsNotEmpty()
  @IsNumber()
  jumlah_pembayaran: number;
}
