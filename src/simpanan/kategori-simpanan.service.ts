import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKategoriSimpananDto } from './dto/create-kategori-simpanan.dto';
import { UpdateKategoriSimpananDto } from './dto/update-kategori-simpanan.dto';

@Injectable()
export class KategoriSimpananService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.kategoriSimpanan.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.kategoriSimpanan.findUnique({
      where: { id },
    });

    if (!item) throw new NotFoundException('Kategori simpanan tidak ditemukan');
    return item;
  }

  create(dto: CreateKategoriSimpananDto) {
    return this.prisma.kategoriSimpanan.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateKategoriSimpananDto) {
    await this.findOne(id); // cek dulu
    return this.prisma.kategoriSimpanan.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.kategoriSimpanan.delete({
      where: { id },
    });
  }
}
