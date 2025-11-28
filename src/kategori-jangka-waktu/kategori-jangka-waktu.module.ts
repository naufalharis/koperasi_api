import { Module } from '@nestjs/common';
import { KategoriJangkaWaktuService } from './kategori-jangka-waktu.service';
import { KategoriJangkaWaktuController } from './kategori-jangka-waktu.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [PrismaModule],
  controllers: [KategoriJangkaWaktuController],
  providers: [KategoriJangkaWaktuService, PrismaService],
})
export class KategoriJangkaWaktuModule {}
