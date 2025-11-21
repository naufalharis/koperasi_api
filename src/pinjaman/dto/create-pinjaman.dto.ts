export class CreatePinjamanDto {
  id_anggota: string;
  id_jangka_waktu: string;
  jumlah: number;
  tanggal: Date;
  tanggal_jatuh_tempo: Date;
  status?: "LUNAS" | "BELUM_LUNAS";
}
