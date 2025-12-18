// src/kategori-simpanan/kategori-simpanan.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateKategoriSimpananDto } from './dto/create-kategori-simpanan.dto';
import { UpdateKategoriSimpananDto } from './dto/update-kategori-simpanan.dto';

@Injectable()
export class KategoriSimpananService {
  constructor(private prisma: PrismaService) {}

  /**
   * Ambil daftar kategori.
   * Jika includeDeleted=true akan mengembalikan entri yang sudah di-soft-delete juga.
   */
  findAll(includeDeleted = false) {
    const where = includeDeleted ? {} : { deleted_at: null };
    return this.prisma.kategoriSimpanan.findMany({ where });
  }

  findOne(id: string, includeDeleted = false) {
    const where = includeDeleted ? { id } : { id, deleted_at: null };
    return this.prisma.kategoriSimpanan.findFirst({ where });
  }

  create(dto: CreateKategoriSimpananDto) {
    return this.prisma.kategoriSimpanan.create({ data: dto });
  }

  update(id: string, dto: UpdateKategoriSimpananDto) {
    return this.prisma.kategoriSimpanan.update({ where: { id }, data: dto });
  }

  /** SOFT DELETE: set deleted_at + deleted_by */
  async softDelete(id: string, deleted_by?: string) {
    const existing = await this.prisma.kategoriSimpanan.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Kategori tidak ditemukan');

    return this.prisma.kategoriSimpanan.update({
      where: { id },
      data: {
        deleted_by: deleted_by ?? null,
        deleted_at: new Date(),
      },
    });
  }

  /** RESTORE: batalkan soft-delete */
  async restore(id: string, userId?: string) {
    const existing = await this.prisma.kategoriSimpanan.findUnique({ where: { id } });
    if (!existing || !existing.deleted_at) throw new NotFoundException('Kategori tidak dalam keadaan terhapus');

    return this.prisma.kategoriSimpanan.update({
      where: { id },
      data: {
        deleted_at: null,
        deleted_by: null,
        updated_by: userId ?? null,
      },
    });
  }

  /** HARD DELETE: hapus permanen */
  async forceDelete(id: string) {
    const existing = await this.prisma.kategoriSimpanan.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Kategori tidak ditemukan');

    return this.prisma.kategoriSimpanan.delete({ where: { id } });
  }
}
