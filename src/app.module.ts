import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JabatanModule } from './jabatan/jabatan.module';
import { KategoriJangkaWaktuModule } from './kategori-jangka-waktu/kategori-jangka-waktu.module';
import { KategoriSimpananModule } from './simpanan/kategori-simpanan.module'; // ← Tambahkan ini
import { PrismaService } from './prisma/prisma.service';
import { KategoriSimpananModule } from './simpanan/kategori-simpanan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    KategoriSimpananModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
