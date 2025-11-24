import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePinjamanDto } from "./dto/create-pinjaman.dto";
import { ApprovePinjamanDto } from "./dto/approve-pinjaman.dto";
import { BayarAngsuranDto } from "./dto/bayar-angsuran.dto";
import { StatusPinjaman } from "@prisma/client";

@Injectable()
export class PinjamanService {
  constructor(private prisma: PrismaService) {}

  async createPinjaman(dto: CreatePinjamanDto) {
    return this.prisma.pinjaman.create({
      data: {
        id_anggota: dto.id_anggota,
        id_jangka_waktu: dto.id_jangka_waktu,
        jumlah: dto.jumlah,
        tanggal: dto.tanggal,
        tanggal_jatuh_tempo: dto.tanggal_jatuh_tempo,

        // Default status = BELUM_LUNAS
        status: (dto.status as StatusPinjaman) || StatusPinjaman.BELUM_LUNAS,

        created_at: new Date(),
      },
    });
  }

  async approvePinjaman(id: string, dto: ApprovePinjamanDto) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: {
        // status = LUNAS / BELUM_LUNAS
        status: dto.status as StatusPinjaman,
        updated_at: new Date(),
      },
    });
  }

  async cairkanPinjaman(id: string) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: {
        // Cairkan = masih BELUM_LUNAS
        status: StatusPinjaman.BELUM_LUNAS,
        updated_at: new Date(),
      },
    });
  }

  async bayarAngsuran(dto: BayarAngsuranDto) {
    const angsuran = await this.prisma.angsuran.findUnique({
      where: { id: dto.id_angsuran },
    });

    if (!angsuran) throw new Error("Angsuran tidak ditemukan");

    const sisa = angsuran.sisa_pinjaman - dto.jumlah_pembayaran;

    return this.prisma.angsuran.update({
      where: { id: dto.id_angsuran },
      data: {
        jumlah_pembayaran: dto.jumlah_pembayaran,
        sisa_pinjaman: sisa,
        tanggal_pembayaran: dto.tanggal_pembayaran,
        updated_at: new Date(),
      },
    });
  }

  async listPinjaman() {
    return this.prisma.pinjaman.findMany({
      include: { anggota: true, jangkaWaktu: true, angsuran: true },
    });
  }

  async getPinjaman(id: string) {
    return this.prisma.pinjaman.findUnique({
      where: { id },
      include: { anggota: true, jangkaWaktu: true, angsuran: true },
    });
  }
}
