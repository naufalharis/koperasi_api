export class UpdatePinjamanDto {
  jumlah?: number;
  tanggal?: Date;
  tanggal_jatuh_tempo?: Date;
  status?: "LUNAS" | "BELUM_LUNAS";
}
