import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAngsuranDto } from './dto/create-angsuran.dto';
import { UpdateAngsuranDto } from './dto/update-angsuran.dto';

@Injectable()
export class AngsuranService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAngsuranDto, userId: string) {
    const pinjaman = await this.prisma.pinjaman.findUnique({
      where: { id: dto.pinjaman_id },
    });

    if (!pinjaman) {
      throw new NotFoundException('Pinjaman tidak ditemukan');
    }

    const totalTerbayar = await this.prisma.angsuran.aggregate({
      where: { pinjaman_id: dto.pinjaman_id },
      _sum: { jumlah_pembayaran: true },
    });

    const sudahDibayar = totalTerbayar._sum.jumlah_pembayaran ?? 0;

    const sisaSaatIni = pinjaman.jumlah - sudahDibayar;

    if (dto.jumlah_pembayaran > sisaSaatIni) {
      throw new BadRequestException('Pembayaran melebihi sisa pinjaman');
    }

    const sisaSetelahBayar = sisaSaatIni - dto.jumlah_pembayaran;

    // Buat angsuran
    const angsuran = await this.prisma.angsuran.create({
      data: {
        pinjaman_id: dto.pinjaman_id,
        tanggal_pembayaran: dto.tanggal_pembayaran,
        jumlah_pembayaran: dto.jumlah_pembayaran,
        sisa_pinjaman: sisaSetelahBayar,
        created_by: userId,
      },
    });

    // Update status pinjaman
    if (sisaSetelahBayar === 0) {
      await this.prisma.pinjaman.update({
        where: { id: dto.pinjaman_id },
        data: { status: 'LUNAS' },
      });
    }

    return angsuran;
  }

  async findAll() {
    return this.prisma.angsuran.findMany({
      include: {
        pinjaman: true,
      },
    });
  }

  async findOne(id: string) {
    const data = await this.prisma.angsuran.findUnique({
      where: { id },
      include: { pinjaman: true },
    });

    if (!data) throw new NotFoundException('Angsuran tidak ditemukan');

    return data;
  }

  async update(id: string, dto: UpdateAngsuranDto) {
    return this.prisma.angsuran.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.angsuran.delete({
      where: { id },
    });
  }
}
