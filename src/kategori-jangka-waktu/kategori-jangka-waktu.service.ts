import { Injectable } from '@nestjs/common';
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
    return this.prisma.kategoriJangkaWaktu.findMany();
  }

  findOne(id: string) {
    return this.prisma.kategoriJangkaWaktu.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateKategoriJangkaWaktuDto) {
    return this.prisma.kategoriJangkaWaktu.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.kategoriJangkaWaktu.delete({
      where: { id },
    });
  }
}
