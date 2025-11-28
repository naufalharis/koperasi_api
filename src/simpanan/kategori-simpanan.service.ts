import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateKategoriSimpananDto } from './dto/create-kategori-simpanan.dto';
import { UpdateKategoriSimpananDto } from './dto/update-kategori-simpanan.dto';

@Injectable()
export class KategoriSimpananService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.kategoriSimpanan.findMany({
      where: { deleted_at: null },
    });
  }

  findOne(id: string) {
    return this.prisma.kategoriSimpanan.findFirst({
      where: { id, deleted_at: null },
    });
  }

  create(dto: CreateKategoriSimpananDto) {
    return this.prisma.kategoriSimpanan.create({
      data: dto,
    });
  }

  update(id: string, dto: UpdateKategoriSimpananDto) {
    return this.prisma.kategoriSimpanan.update({
      where: { id },
      data: dto,
    });
  }

  /** ============= SOFT DELETE ============= */
  async softDelete(id: string, deleted_by: string) {
    // Cek data apakah ada
    const existing = await this.prisma.kategoriSimpanan.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    // Soft delete
    return this.prisma.kategoriSimpanan.update({
      where: { id },
      data: {
        deleted_by,
        deleted_at: new Date(),
      },
    });
  }
  /** ============= PERMANENT DELETE ============= */
async forceDelete(id: string) {
  const existing = await this.prisma.kategoriSimpanan.findUnique({
    where: { id },
  });

  if (!existing) throw new NotFoundException('Kategori tidak ditemukan');

  return this.prisma.kategoriSimpanan.delete({
    where: { id },
  });
}


}
