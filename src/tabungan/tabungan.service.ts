import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTabunganDto } from './dto/create-tabungan.dto';
import { UpdateTabunganDto } from './dto/update-tabungan.dto';

@Injectable()
export class TabunganService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTabunganDto, userId?: string) {
    return this.prisma.tabungan.create({
      data: {
        id_anggota: dto.id_anggota,
        id_kategori_simpanan: dto.id_kategori_simpanan,
        tanggal: new Date(dto.tanggal),
        jumlah: dto.jumlah,
        created_by: userId ?? null,
      },
    });
  }

    async findAll() {
      return this.prisma.tabungan.findMany({
        where: {
          deletedAt: null, // Hanya tampilin yang belum soft delete
        },
        orderBy: { tanggal: 'desc' },
        include: {
          anggota: true,
          kategoriSimpanan: true,
        },
      });
    }

  async findOne(id: string) {
    const data = await this.prisma.tabungan.findUnique({
      where: { id },
      include: {
        anggota: true,
        kategoriSimpanan: true,
      }
    });

    if (!data) throw new NotFoundException('Data tabungan tidak ditemukan');
    return data;
  }

  async update(id: string, dto: UpdateTabunganDto, userId?: string) {
    await this.findOne(id);

    return this.prisma.tabungan.update({
      where: { id },
      data: {
        ...dto,
        updated_by: userId ?? null,
        tanggal: dto.tanggal ? new Date(dto.tanggal) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.tabungan.delete({
      where: { id }
    });
  }

async softDelete(id: string, userId: string) {
  return await this.prisma.tabungan.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
}

async hardDelete(id: string) {
  await this.findOne(id);

  return this.prisma.tabungan.delete({
    where: { id },
  });
}


}
