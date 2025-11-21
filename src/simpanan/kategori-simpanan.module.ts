import { Module } from '@nestjs/common';
import { KategoriSimpananService } from './kategori-simpanan.service';
import { KategoriSimpananController } from './kategori-simpanan.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // <-- tambahkan ini
  controllers: [KategoriSimpananController],
  providers: [KategoriSimpananService],
})
export class KategoriSimpananModule {}
