import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePenarikanDto } from './dto/create-penarikan.dto';
import { UpdatePenarikanDto } from './dto/update-penarikan.dto';

@Injectable()
export class PenarikanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePenarikanDto) {
    const { id_anggota, id_tabungan, jumlah } = dto;

    // 1. Cek tabungan valid
    const tabungan = await this.prisma.tabungan.findUnique({
      where: { id: id_tabungan },
    });

    if (!tabungan) throw new NotFoundException('Tabungan tidak ditemukan');
    if (tabungan.id_anggota !== id_anggota)
      throw new BadRequestException('Tabungan tidak dimiliki anggota tersebut');

    // 2. Cek saldo cukup
    if (tabungan.jumlah < jumlah)
      throw new BadRequestException('Saldo tabungan tidak mencukupi');

    // 3. Transaksi: Kurangi saldo + catat penarikan
    return await this.prisma.$transaction(async (tx) => {
      // kurangi saldo
      await tx.tabungan.update({
        where: { id: id_tabungan },
        data: { jumlah: tabungan.jumlah - jumlah },
      });

      // simpan penarikan
      return await tx.penarikan.create({
        data: {
          ...dto,
        },
      });
    });
  }

  findAll() {
    return this.prisma.penarikan.findMany({
      include: {
        anggota: true,
        tabungan: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.penarikan.findUnique({
      where: { id },
      include: {
        anggota: true,
        tabungan: true,
      },
    });
  }

  update(id: string, dto: UpdatePenarikanDto) {
    return this.prisma.penarikan.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.penarikan.delete({
      where: { id },
    });
  }
}
