import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Anggota } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Anggota[]> {
    return this.prisma.anggota.findMany({
      include: { jabatan: true },
    });
  }

  async findById(id: number): Promise<Anggota | null> {
    return this.prisma.anggota.findUnique({
      where: { id: String(id) },
      include: { jabatan: true }
    });
  }

  async update(id: number, data: Partial<Anggota>): Promise<Anggota> {
    return this.prisma.anggota.update({
       where: { id: String(id) },
      data,
    });
  }

  async delete(id: number): Promise<Anggota> {
    return this.prisma.anggota.delete({
       where: { id: String(id) },
    });
  }
}