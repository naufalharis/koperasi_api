import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';

@Injectable()
export class JabatanService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateJabatanDto) {
    return this.prisma.jabatan.create({ data });
  }

  findAll() {
    return this.prisma.jabatan.findMany({
      where: { deleted_at: null },
      include: { anggota: true },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.jabatan.findFirst({
      where: { id, deleted_at: null },
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
    return this.prisma.jabatan.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: userId,
      },
    });
  }

  // 🔄 Restore (WAJIB ADA untuk controller)
  async restore(id: string) {
    return this.prisma.jabatan.update({
      where: { id },
      data: {
        deleted_at: null,
        deleted_by: null,
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
