// kategori-jangka-waktu.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateKategoriJangkaWaktuDto } from './dto/create-kategori-jangka-waktu.dto';
import { UpdateKategoriJangkaWaktuDto } from './dto/update-kategori-jangka-waktu.dto';

@Injectable()
export class KategoriJangkaWaktuService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateKategoriJangkaWaktuDto) {
    return this.prisma.kategoriJangkaWaktu.create({ data });
  }

  findAll() {
    return this.prisma.kategoriJangkaWaktu.findMany({
      where: { deleted_at: null }
    });
  }

  async findOne(id: string) {
    const result = await this.prisma.kategoriJangkaWaktu.findFirst({
      where: { id, deleted_at: null }
    });
    
    if (!result) {
      throw new NotFoundException(`Kategori jangka waktu dengan ID ${id} tidak ditemukan`);
    }
    
    return result;
  }

  async update(id: string, data: UpdateKategoriJangkaWaktuDto) {
    // Cek apakah data exists
    await this.findOne(id);
    
    return this.prisma.kategoriJangkaWaktu.update({
      where: { id },
      data,
    });
  }

  // SOFT DELETE
  async remove(id: string) {
    // Cek apakah data exists
    await this.findOne(id);
    
    return this.prisma.kategoriJangkaWaktu.update({
      where: { id },
      data: {
        deleted_at: new Date()
      }
    });
  }

  // HARD DELETE
  async hardDelete(id: string) {
    try {
      // Coba hapus langsung
      const result = await this.prisma.kategoriJangkaWaktu.delete({
        where: { id }
      });
      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Kategori jangka waktu dengan ID ${id} tidak ditemukan`);
      }
      throw error;
    }
  }
}