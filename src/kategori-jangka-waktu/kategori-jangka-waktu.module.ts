import { Module } from '@nestjs/common';
import { KategoriJangkaWaktuService } from './kategori-jangka-waktu.service';
import { KategoriJangkaWaktuController } from './kategori-jangka-waktu.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KategoriJangkaWaktuController],
  providers: [KategoriJangkaWaktuService, PrismaService],
})
export class KategoriJangkaWaktuModule {}
