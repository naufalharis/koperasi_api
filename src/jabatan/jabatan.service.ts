import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';

@Injectable()
export class JabatanService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateJabatanDto) {
    return this.prisma.jabatan.create({
      data,
    });
  }

  findAll() {
    return this.prisma.jabatan.findMany({
      include: {
        anggota: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.jabatan.findUnique({
      where: { id },
      include: {
        anggota: true,
      },
    });
  }

  update(id: string, data: UpdateJabatanDto) {
    return this.prisma.jabatan.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.jabatan.delete({
      where: { id },
    });
  }
}
