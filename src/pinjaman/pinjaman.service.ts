import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePinjamanDto } from "./dto/create-pinjaman.dto";
import { ApprovePinjamanDto } from "./dto/approve-pinjaman.dto";
import { BayarAngsuranDto } from "./dto/bayar-angsuran.dto";
import { UpdatePinjamanDto } from "./dto/update-pinjaman.dto";
import { StatusPinjaman } from "@prisma/client";

@Injectable()
export class PinjamanService {
  constructor(private prisma: PrismaService) {}

  // ===========================
  // CREATE PINJAMAN
  // ===========================
  async createPinjaman(dto: CreatePinjamanDto) {
    return this.prisma.pinjaman.create({
      data: {
        id_anggota: dto.id_anggota,
        id_jangka_waktu: dto.id_jangka_waktu,
        jumlah: dto.jumlah,
        tanggal: dto.tanggal,
        tanggal_jatuh_tempo: dto.tanggal_jatuh_tempo,
        status: dto.status
          ? StatusPinjaman[dto.status]
          : StatusPinjaman.BELUM_LUNAS,
      },
    });
  }

  // ===========================
  // UPDATE PINJAMAN
  // ===========================
  async updatePinjaman(id: string, dto: UpdatePinjamanDto) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: {
        jumlah: dto.jumlah,
        tanggal: dto.tanggal,
        tanggal_jatuh_tempo: dto.tanggal_jatuh_tempo,
        status: dto.status ? StatusPinjaman[dto.status] : undefined,
        updated_at: new Date(),
      },
    });
  }

  // ===========================
  // APPROVE PINJAMAN
  // ===========================
  async approvePinjaman(id: string, dto: ApprovePinjamanDto) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: {
        status: StatusPinjaman[dto.status],
        updated_at: new Date(),
      },
    });
  }

  // ===========================
  // CAIRKAN PINJAMAN
  // ===========================
  async cairkanPinjaman(id: string) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: {
        status: StatusPinjaman.BELUM_LUNAS,
        updated_at: new Date(),
      },
    });
  }

  // ===========================
  // BAYAR ANGSURAN
  // ===========================
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

  // ===========================
  // LIST PINJAMAN (tanpa yg dihapus)
  // ===========================
  async listPinjaman() {
    return this.prisma.pinjaman.findMany({
      where: { deleted_at: null },
      include: { anggota: true, jangkaWaktu: true, angsuran: true },
    });
  }

  // ===========================
  // GET DETAIL PINJAMAN
  // ===========================
  async getPinjaman(id: string) {
    return this.prisma.pinjaman.findFirst({
      where: { id, deleted_at: null },
      include: { anggota: true, jangkaWaktu: true, angsuran: true },
    });
  }

  // ===========================
  // SOFT DELETE
  // ===========================
  async softDeletePinjaman(id: string) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  // ===========================
  // LIST TEMPAT SAMPAH
  // ===========================
  async trashBin() {
    return this.prisma.pinjaman.findMany({
      where: { NOT: { deleted_at: null } },
      include: { anggota: true, jangkaWaktu: true, angsuran: true },
    });
  }

  // ===========================
  // RESTORE PINJAMAN
  // ===========================
  async restorePinjaman(id: string) {
    return this.prisma.pinjaman.update({
      where: { id },
      data: { deleted_at: null },
    });
  }

  // ===========================
  // HARD DELETE (PERMANEN)
  // ===========================
  async hardDeletePinjaman(id: string) {
    return this.prisma.pinjaman.delete({
      where: { id },
    });
  }
}
