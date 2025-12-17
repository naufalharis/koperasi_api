import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';

@Injectable()
export class JabatanService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateJabatanDto) {
    return this.prisma.jabatan.create({ data });
  }

  /**
   * Ambil daftar jabatan.
   * @param includeDeleted kalau true maka kembalikan semua termasuk yang sudah di-soft-delete
   */
  findAll(includeDeleted = false) {
    const where = includeDeleted ? {} : { deleted_at: null };
    return this.prisma.jabatan.findMany({
      where,
      include: { anggota: true },
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Ambil satu jabatan. Default exclude yang sudah dihapus.
   * @param includeDeleted kalau true maka ambil walau sudah di-soft-delete
   */
  findOne(id: string, includeDeleted = false) {
    const where = includeDeleted ? { id } : { id, deleted_at: null };
    return this.prisma.jabatan.findFirst({
      where,
      include: { anggota: true },
    });
  }

  update(id: string, data: UpdateJabatanDto) {
    return this.prisma.jabatan.update({
      where: { id },
      data,
    });
  }

  // 🔥 Soft Delete
  async softDelete(id: string, userId: string) {
    // optional: cek apakah ada dulu
    const exists = await this.prisma.jabatan.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Jabatan tidak ditemukan');

    return this.prisma.jabatan.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: userId ?? null,
      },
    });
  }

  // 🔄 Restore
  async restore(id: string, userId?: string) {
    const exists = await this.prisma.jabatan.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Jabatan tidak ditemukan');

    return this.prisma.jabatan.update({
      where: { id },
      data: {
        deleted_at: null,
        deleted_by: null,
        updated_by: userId ?? null,
      },
    });
  }

  // ❌ Hard delete
  remove(id: string) {
    return this.prisma.jabatan.delete({
      where: { id },
    });
  }
}
